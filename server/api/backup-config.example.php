<?php
/**
 * Template for backup-config.php.
 *
 *   1. On the Hostinger server (NOT in this repo), copy this file to
 *      backup-config.php in the same directory.
 *   2. Edit backup-config.php and replace every placeholder with a real value.
 *   3. backup-config.php is gitignored, so the real credentials never leave
 *      the server. This *.example.php file ships in builds and contains
 *      placeholders only.
 *
 * Required keys are documented inline below.
 */

return [
    // GitHub username or org that owns the private backup repository.
    'github_owner'         => 'YOUR-GITHUB-USERNAME',

    // Repository name (private). E.g. 'hausarzt-cottbus-backups'.
    'github_repo'          => 'hausarzt-cottbus-backups',

    // Fine-grained Personal Access Token with "Contents: Read and write" on
    // ONLY this repository. See docs/Setup.md for the exact creation steps.
    'github_token'         => 'github_pat_REPLACE_ME',

    // Any long random string. Required as ?key=... when triggering the
    // backup from a browser (e.g. for manual testing). Cron jobs run via
    // PHP CLI and bypass this check.
    'backup_trigger_token' => 'REPLACE_WITH_A_LONG_RANDOM_STRING',

    // Rolling-window retention: any news-YYYY-MM-DD.json file older than this
    // many days is auto-deleted from the GitHub repo on each cron run.
    'retention_days'       => 30,
];
