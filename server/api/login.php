<?php
/**
 * POST /api/login.php
 *
 * Body: { "password": "..." }
 *
 * Verifies the password against auth-config.php's bcrypt hash. On success,
 * creates a server-side session and sets an HttpOnly cookie. On failure,
 * records the attempt for per-IP rate limiting (5 fails in 10 min → 429).
 */

declare(strict_types=1);
require_once __DIR__ . '/auth-helpers.php';

set_cors_headers();
handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(['error' => 'method not allowed'], 405);
}

if (!check_login_rate_limit()) {
    send_json(['error' => 'too many attempts'], 429);
}

$raw = file_get_contents('php://input');
$body = $raw === false ? null : json_decode($raw, true);
$password = is_array($body) ? ($body['password'] ?? '') : '';

if (!is_string($password) || $password === '') {
    record_failed_login();
    send_json(['error' => 'invalid request'], 400);
}

$cfg = load_auth_config();
if ($cfg['admin_password_hash'] === '' ||
    !password_verify($password, $cfg['admin_password_hash'])) {
    record_failed_login();
    send_json(['error' => 'invalid credentials'], 401);
}

clear_login_attempts();
create_session();
send_json(['ok' => true]);
