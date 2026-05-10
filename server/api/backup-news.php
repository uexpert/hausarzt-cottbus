<?php
/**
 * Daily backup of data/news.json to a private GitHub repository.
 *
 * Triggered by Hostinger cron via PHP CLI:
 *   /usr/bin/php /home/<user>/public_html/api/backup-news.php
 *
 * Or for manual smoke-testing, by visiting:
 *   https://<host>/api/backup-news.php?key=<backup_trigger_token>
 *
 * Configuration lives in backup-config.php (gitignored). A committed
 * template at backup-config.example.php documents the required keys.
 */

declare(strict_types=1);

// ── Load config ────────────────────────────────────────────────────────────
$configPath = __DIR__ . '/backup-config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'backup-config.php missing on server']);
    exit;
}
$config = require $configPath;

$owner      = $config['github_owner']         ?? '';
$repo       = $config['github_repo']          ?? '';
$token      = $config['github_token']         ?? '';
$trigger    = $config['backup_trigger_token'] ?? '';
$retention  = (int)($config['retention_days'] ?? 30);

// ── Access control ─────────────────────────────────────────────────────────
// Cron runs us via PHP CLI; allow that unconditionally. From the web, require
// the trigger token in ?key=… to prevent random visitors from triggering jobs.
$isCli = (php_sapi_name() === 'cli');
if (!$isCli) {
    header('Content-Type: application/json');
    if ($trigger === '' || ($_GET['key'] ?? '') !== $trigger) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'forbidden']);
        exit;
    }
}

// ── Resolve news.json (mirror save-news.php's dual layout) ─────────────────
$dataPath = __DIR__ . '/../data/news.json';
if (!file_exists($dataPath)) {
    $dataPath = __DIR__ . '/../../public/data/news.json';
}
if (!file_exists($dataPath)) {
    report(['ok' => false, 'error' => 'news.json not found'], 500);
}
$json = file_get_contents($dataPath);
if ($json === false) {
    report(['ok' => false, 'error' => 'failed to read news.json'], 500);
}

// ── Filename based on Berlin local date ────────────────────────────────────
date_default_timezone_set('Europe/Berlin');
$today    = new DateTimeImmutable('today');
$filename = 'news-' . $today->format('Y-m-d') . '.json';

// ── Upload to GitHub ───────────────────────────────────────────────────────
$result = github_put_file($owner, $repo, $token, $filename, $json,
    'Backup ' . $today->format('Y-m-d'));

if (!$result['ok']) {
    report(['ok' => false, 'step' => 'upload', 'error' => $result['error']], 500);
}

// ── Prune old backups (older than $retention days) ─────────────────────────
$prunedCount = 0;
$pruneErrors = [];
$listing = github_list_root($owner, $repo, $token);
if ($listing['ok']) {
    $cutoff = $today->modify('-' . $retention . ' days');
    foreach ($listing['items'] as $item) {
        if (!preg_match('/^news-(\d{4}-\d{2}-\d{2})\.json$/', $item['name'], $m)) continue;
        try {
            $fileDate = new DateTimeImmutable($m[1]);
        } catch (Exception $e) {
            continue;
        }
        if ($fileDate < $cutoff) {
            $del = github_delete_file($owner, $repo, $token, $item['name'], $item['sha'],
                'Prune ' . $item['name']);
            if ($del['ok']) {
                $prunedCount++;
            } else {
                $pruneErrors[] = $item['name'] . ': ' . $del['error'];
            }
        }
    }
}

// ── Append local log line (server-side only, never uploaded) ───────────────
$logDir  = dirname($dataPath);
$logLine = sprintf(
    "[%s] uploaded=%s pruned=%d errors=%s\n",
    (new DateTimeImmutable())->format('c'),
    $filename,
    $prunedCount,
    $pruneErrors ? implode('|', $pruneErrors) : '-'
);
@file_put_contents($logDir . '/backups.log', $logLine, FILE_APPEND);

report([
    'ok'        => true,
    'uploaded'  => $filename,
    'updated'   => $result['updated'],   // true = same-day overwrite, false = new file
    'pruned'    => $prunedCount,
    'errors'    => $pruneErrors,
], 200);

// ══ Helpers ═══════════════════════════════════════════════════════════════

function report(array $payload, int $status): void {
    if (php_sapi_name() !== 'cli') {
        http_response_code($status);
        header('Content-Type: application/json');
    }
    echo json_encode($payload, JSON_UNESCAPED_SLASHES) . "\n";
    exit;
}

/**
 * PUT a file via GitHub Contents API. If the file already exists at that path,
 * fetch its current sha first and include it so GitHub treats this as an update.
 *
 * @return array{ok:bool, updated?:bool, error?:string}
 */
function github_put_file(string $owner, string $repo, string $token,
                         string $path, string $content, string $message): array {
    $url = "https://api.github.com/repos/$owner/$repo/contents/$path";

    // Check for existing file (same day re-run / manual re-trigger)
    $existing = github_http('GET', $url, $token);
    $sha = null;
    $isUpdate = false;
    if ($existing['status'] === 200) {
        $body = json_decode($existing['body'], true);
        $sha = $body['sha'] ?? null;
        $isUpdate = true;
    } elseif ($existing['status'] !== 404) {
        return ['ok' => false, 'error' => 'GET failed: HTTP ' . $existing['status'] . ' ' . $existing['body']];
    }

    $payload = [
        'message' => $message,
        'content' => base64_encode($content),
        'branch'  => 'main',
    ];
    if ($sha !== null) $payload['sha'] = $sha;

    $put = github_http('PUT', $url, $token, $payload);
    if ($put['status'] !== 200 && $put['status'] !== 201) {
        return ['ok' => false, 'error' => 'PUT failed: HTTP ' . $put['status'] . ' ' . $put['body']];
    }
    return ['ok' => true, 'updated' => $isUpdate];
}

/**
 * List the root of the repo (single page; >30 backup files would still fit).
 *
 * @return array{ok:bool, items?:array<int,array{name:string,sha:string}>, error?:string}
 */
function github_list_root(string $owner, string $repo, string $token): array {
    $url = "https://api.github.com/repos/$owner/$repo/contents/?ref=main";
    $res = github_http('GET', $url, $token);
    if ($res['status'] !== 200) {
        return ['ok' => false, 'error' => 'LIST failed: HTTP ' . $res['status']];
    }
    $data = json_decode($res['body'], true) ?? [];
    $items = [];
    foreach ($data as $entry) {
        if (($entry['type'] ?? '') === 'file') {
            $items[] = ['name' => $entry['name'], 'sha' => $entry['sha']];
        }
    }
    return ['ok' => true, 'items' => $items];
}

/**
 * @return array{ok:bool, error?:string}
 */
function github_delete_file(string $owner, string $repo, string $token,
                            string $path, string $sha, string $message): array {
    $url = "https://api.github.com/repos/$owner/$repo/contents/$path";
    $res = github_http('DELETE', $url, $token, [
        'message' => $message,
        'sha'     => $sha,
        'branch'  => 'main',
    ]);
    if ($res['status'] !== 200) {
        return ['ok' => false, 'error' => 'DELETE failed: HTTP ' . $res['status'] . ' ' . $res['body']];
    }
    return ['ok' => true];
}

/**
 * Thin curl wrapper that returns { status, body }.
 */
function github_http(string $method, string $url, string $token, ?array $jsonBody = null): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_HTTPHEADER     => [
            'Authorization: token ' . $token,
            'Accept: application/vnd.github+json',
            'X-GitHub-Api-Version: 2022-11-28',
            'User-Agent: hausarzt-cottbus-backup',
            'Content-Type: application/json',
        ],
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_TIMEOUT        => 60,
    ]);
    if ($jsonBody !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($jsonBody, JSON_UNESCAPED_SLASHES));
    }
    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err    = curl_error($ch);
    curl_close($ch);

    if ($body === false) {
        return ['status' => 0, 'body' => 'curl error: ' . $err];
    }
    return ['status' => (int)$status, 'body' => (string)$body];
}
