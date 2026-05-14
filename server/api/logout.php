<?php
/**
 * POST /api/logout.php
 *
 * Removes the current session token from the server-side store and clears
 * the session cookie on the client. Always returns 200 — logging out an
 * already-anonymous client is a no-op rather than an error.
 */

declare(strict_types=1);
require_once __DIR__ . '/auth-helpers.php';

set_cors_headers();
handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(['error' => 'method not allowed'], 405);
}

destroy_session();
send_json(['ok' => true]);
