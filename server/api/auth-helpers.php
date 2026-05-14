<?php
/**
 * Shared helpers for the admin auth endpoints (login / logout / whoami /
 * save-news). Provides:
 *
 *   - Config loading (auth-config.php, gitignored)
 *   - CORS headers with credentials reflection
 *   - JSON-locked read/write helpers (LOCK_EX / LOCK_SH)
 *   - Session create / verify / destroy backed by data/sessions.json
 *   - Per-IP login rate limiting backed by data/login-attempts.json
 *
 * Cookie path is auto-derived from $_SERVER['SCRIPT_NAME'] so the same code
 * works for root deploys ("/") and sub-folder deploys ("/hausarzt-cottbus/").
 *
 * Secure cookie flag is dropped on plain HTTP (local dev only) and always
 * set on production HTTPS.
 */

declare(strict_types=1);

// ── Config ─────────────────────────────────────────────────────────────────

function load_auth_config(): array {
    $path = __DIR__ . '/auth-config.php';
    if (!file_exists($path)) {
        send_json(['error' => 'auth-config.php missing on server'], 500);
    }
    $c = require $path;
    if (!is_array($c)) {
        send_json(['error' => 'auth-config.php must return an array'], 500);
    }
    return [
        'admin_password_hash' => (string)($c['admin_password_hash'] ?? ''),
        'session_ttl_seconds' => (int)($c['session_ttl_seconds']    ?? 28800),
        'cookie_name'         => (string)($c['cookie_name']         ?? 'hac_session'),
    ];
}

// ── Path resolution (mirrors save-news.php's dual layout) ──────────────────

function data_dir(): string {
    // Production: server/api/save-news.php → ../data/
    $prod = __DIR__ . '/../data';
    if (is_dir($prod)) return $prod;
    // Dev:        server/api/save-news.php → ../../public/data/
    $dev = __DIR__ . '/../../public/data';
    if (is_dir($dev)) return $dev;
    // Fallback: create the prod-style directory next to api/
    @mkdir($prod, 0755, true);
    return $prod;
}

function sessions_path(): string { return data_dir() . '/sessions.json'; }
function attempts_path(): string { return data_dir() . '/login-attempts.json'; }

// ── Cookie path auto-derivation ────────────────────────────────────────────

function cookie_path(): string {
    // SCRIPT_NAME is '/api/login.php' (root deploy) or
    // '/hausarzt-cottbus/api/login.php' (sub-folder deploy). Strip the
    // trailing '/api/<file>.php' twice to get the base href path.
    $script = $_SERVER['SCRIPT_NAME'] ?? '/api/login.php';
    $dir = dirname(dirname($script));
    if ($dir === '' || $dir === '.' || $dir === DIRECTORY_SEPARATOR || $dir === '\\') {
        return '/';
    }
    return rtrim(str_replace('\\', '/', $dir), '/') . '/';
}

// ── CORS ───────────────────────────────────────────────────────────────────

function set_cors_headers(): void {
    static $allowed = [
        'https://www.hausarzt-cottbus.de',
        'https://hausarzt-cottbus.de',
        'http://localhost:4200',
        'http://localhost:8001',
    ];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Vary: Origin');
}

function handle_preflight(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ── JSON I/O ───────────────────────────────────────────────────────────────

function send_json(array $body, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_locked(string $path): array {
    if (!file_exists($path)) return [];
    $fh = @fopen($path, 'r');
    if (!$fh) return [];
    @flock($fh, LOCK_SH);
    $raw = stream_get_contents($fh);
    @flock($fh, LOCK_UN);
    @fclose($fh);
    $data = json_decode((string)$raw, true);
    return is_array($data) ? $data : [];
}

function write_json_locked(string $path, array $data): bool {
    $dir = dirname($path);
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $fh = @fopen($path, 'c+');
    if (!$fh) return false;
    @flock($fh, LOCK_EX);
    ftruncate($fh, 0);
    fwrite($fh, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    fflush($fh);
    @flock($fh, LOCK_UN);
    @fclose($fh);
    return true;
}

// ── Sessions ───────────────────────────────────────────────────────────────

function gc_sessions(array $sessions): array {
    $now = time();
    $kept = [];
    foreach ($sessions as $token => $info) {
        if (is_array($info) && ($info['expires_at'] ?? 0) > $now) {
            $kept[$token] = $info;
        }
    }
    return $kept;
}

function create_session(): string {
    $cfg = load_auth_config();
    $token = bin2hex(random_bytes(32));
    $now = time();
    $sessions = gc_sessions(read_json_locked(sessions_path()));
    $sessions[$token] = [
        'expires_at' => $now + $cfg['session_ttl_seconds'],
        'created_at' => $now,
        'ip'         => $_SERVER['REMOTE_ADDR'] ?? '',
    ];
    write_json_locked(sessions_path(), $sessions);
    set_session_cookie($cfg['cookie_name'], $token, $now + $cfg['session_ttl_seconds']);
    return $token;
}

function verify_session(): ?array {
    $cfg = load_auth_config();
    $token = $_COOKIE[$cfg['cookie_name']] ?? '';
    if ($token === '') return null;
    $sessions = read_json_locked(sessions_path());
    $info = $sessions[$token] ?? null;
    if (!is_array($info)) return null;
    if (($info['expires_at'] ?? 0) <= time()) return null;
    return $info;
}

function destroy_session(): void {
    $cfg = load_auth_config();
    $token = $_COOKIE[$cfg['cookie_name']] ?? '';
    if ($token !== '') {
        $sessions = read_json_locked(sessions_path());
        unset($sessions[$token]);
        write_json_locked(sessions_path(), gc_sessions($sessions));
    }
    // Always send a clear-cookie header, even if there was no session
    set_session_cookie($cfg['cookie_name'], '', 1);
}

function require_auth(): array {
    $session = verify_session();
    if ($session === null) {
        send_json(['error' => 'session required'], 401);
    }
    return $session;
}

function set_session_cookie(string $name, string $value, int $expires): void {
    $secure = (($_SERVER['HTTPS'] ?? 'off') !== 'off');
    setcookie($name, $value, [
        'expires'  => $expires,
        'path'     => cookie_path(),
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// ── Login rate limiting ────────────────────────────────────────────────────

const LOGIN_WINDOW_SECONDS = 600;   // 10 min
const LOGIN_MAX_ATTEMPTS   = 5;

function check_login_rate_limit(): bool {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if ($ip === '') return true;
    $attempts = read_json_locked(attempts_path());
    $cutoff = time() - LOGIN_WINDOW_SECONDS;
    $list = array_filter((array)($attempts[$ip] ?? []), fn($t) => $t > $cutoff);
    return count($list) < LOGIN_MAX_ATTEMPTS;
}

function record_failed_login(): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if ($ip === '') return;
    $attempts = read_json_locked(attempts_path());
    $cutoff = time() - LOGIN_WINDOW_SECONDS;
    // GC every IP entry while we're already holding the file
    $cleaned = [];
    foreach ($attempts as $k => $list) {
        $list = array_values(array_filter((array)$list, fn($t) => $t > $cutoff));
        if (!empty($list)) $cleaned[$k] = $list;
    }
    $cleaned[$ip] = $cleaned[$ip] ?? [];
    $cleaned[$ip][] = time();
    write_json_locked(attempts_path(), $cleaned);
}

function clear_login_attempts(): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if ($ip === '') return;
    $attempts = read_json_locked(attempts_path());
    if (isset($attempts[$ip])) {
        unset($attempts[$ip]);
        write_json_locked(attempts_path(), $attempts);
    }
}
