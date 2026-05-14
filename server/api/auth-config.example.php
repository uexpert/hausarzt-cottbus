<?php
/**
 * Template for auth-config.php.
 *
 *   1. On every host where the site runs (local dev AND each Hostinger
 *      account), copy this file to auth-config.php in the same directory.
 *   2. Generate a bcrypt hash for your real admin password and paste it
 *      below in place of the placeholder. Generate locally with:
 *
 *        php -r 'echo password_hash("your-real-password", PASSWORD_BCRYPT, ["cost" => 12]) . PHP_EOL;'
 *
 *      Cost 12 takes <1s per check on Hostinger Premium and meaningfully
 *      raises offline-cracking time if the hash ever leaks.
 *   3. auth-config.php is gitignored (see .gitignore). The placeholder hash
 *      in this template corresponds to no real password.
 *
 * To rotate the admin password: regenerate the hash, paste the new value,
 * save the file. Existing sessions remain valid until they expire (or
 * delete data/sessions.json to invalidate them immediately).
 */

return [
    // Bcrypt hash of the admin password. NEVER commit a real value.
    'admin_password_hash' => '$2y$12$REPLACE_THIS_WITH_password_hash_BCRYPT_OUTPUT',

    // Session lifetime in seconds. 28800 = 8 h (one workday). Re-login is
    // required after this elapses. Reduce during testing if you want to
    // observe expiry behavior without waiting.
    'session_ttl_seconds' => 28800,

    // Name of the cookie holding the session token. Changing this value
    // invalidates every existing session at once.
    'cookie_name'         => 'hac_session',
];
