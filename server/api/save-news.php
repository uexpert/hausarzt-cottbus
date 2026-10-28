<?php
/**
 * POST /api/save-news.php
 *
 * Persists the admin's notice array to data/news.json. Authentication is
 * by HttpOnly session cookie issued by login.php; no static API key.
 */

declare(strict_types=1);
require_once __DIR__ . '/auth-helpers.php';

set_cors_headers();
handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(['error' => 'method not allowed'], 405);
}

require_auth();

$body = file_get_contents('php://input');
$data = json_decode((string)$body, true);
if (!is_array($data)) {
    send_json(['error' => 'invalid JSON'], 400);
}

// data_dir() resolves prod (api/../data) vs. dev (server/api/../../public/data)
// and creates data/ on the server if it does not exist yet. news.json is not
// part of the build, so the first save creates it.
$filePath = data_dir() . '/news.json';

$result = file_put_contents(
    $filePath,
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);
if ($result === false) {
    send_json(['error' => 'failed to write file'], 500);
}

send_json(['success' => true, 'saved' => count($data) . ' notices']);
