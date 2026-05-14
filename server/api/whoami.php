<?php
/**
 * GET /api/whoami.php
 *
 * Returns 200 if the request carries a valid, unexpired session cookie;
 * 401 otherwise. Used by the Angular authGuard to revalidate the admin
 * session against the server before allowing dashboard navigation.
 */

declare(strict_types=1);
require_once __DIR__ . '/auth-helpers.php';

set_cors_headers();
handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    send_json(['error' => 'method not allowed'], 405);
}

require_auth();
send_json(['ok' => true]);
