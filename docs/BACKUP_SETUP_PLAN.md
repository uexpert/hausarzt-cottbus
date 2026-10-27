# Backup Setup Plan — `news.json` → private GitHub repo

**Status:** Code complete. This is a one-time **ops/deployment** task, not a coding task.
**Goal:** Automatically upload `data/news.json` to a private GitHub repo every day, with a 30-day rolling retention, so every admin save is versioned off-site.

---

## 0. What already exists (do NOT re-implement)

| File | Role |
|------|------|
| `server/api/backup-news.php` | The whole job: reads `news.json` → uploads to GitHub Contents API → prunes files older than `retention_days` → appends to `backups.log` |
| `server/api/backup-config.example.php` | Committed template with placeholders only |
| `server/api/.htaccess` | Denies direct HTTP download of `backup-config.php` |
| `.gitignore` | Ignores the real `backup-config.php` so secrets are never committed |

The script needs **no code changes**. It needs a real `backup-config.php` (server-only) + a cron job.

### How the script behaves
- **Filename:** `news-YYYY-MM-DD.json`, dated in `Europe/Berlin` timezone. One file per day.
- **Same-day re-run:** fetches the existing file's `sha` and overwrites in place (`"updated":true`).
- **Prune:** on every run, deletes any `news-YYYY-MM-DD.json` in the repo root older than `retention_days`.
- **Log:** appends one line per run to `data/backups.log` (server-side only, never uploaded).

### Access control
```
Cron  (PHP CLI)      → runs unconditionally  (php_sapi_name() === 'cli')
Browser (?key=match) → runs
Browser (no/bad key) → 403 forbidden
```

---

## Step 1 — Create the GitHub backup target (once per environment)

1. Create a **private** repo, e.g. `hausarzt-cottbus-backups`, **with an initial README** (so a `main` branch exists — the script pushes to `main`).
2. GitHub → Settings → Developer settings → **Fine-grained personal access tokens** → Generate:
   - Resource owner: your account
   - Repository access: **Only select repositories** → the backup repo
   - Permissions → Repository → **Contents: Read and write** (nothing else)
   - Expiration: 1 year (set a calendar reminder to rotate before expiry)
3. Copy the `github_pat_…` token — shown only once.

> Use a **separate** repo + PAT for the test host and for production, so histories and blast radius don't mix.

## Step 2 — Create `backup-config.php` on the server (once per environment)

The build ships `api/backup-config.example.php` to the server. In hPanel File Manager, **copy** it and rename the copy to `backup-config.php`, then fill in:

```php
return [
    'github_owner'         => 'your-github-username',
    'github_repo'          => 'hausarzt-cottbus-backups',
    'github_token'         => 'github_pat_...',            // from Step 1
    'backup_trigger_token' => 'a-long-random-string',      // for manual ?key= tests
    'retention_days'       => 30,
];
```

⚠️ Create this **on the server only**. It is gitignored on purpose — never commit it.

## Step 3 — Smoke-test before trusting cron

Visit in a browser:
```
https://<host>/api/backup-news.php?key=<backup_trigger_token>
```
Expect:
```json
{"ok":true,"uploaded":"news-YYYY-MM-DD.json","updated":false,"pruned":0,"errors":[]}
```
and a fresh commit in the GitHub repo. Re-run the same day → `"updated":true`.
Wrong/missing `?key=` → `403 forbidden` (guard working as intended).

## Step 4 — Schedule the cron job

hPanel → Advanced → **Cron Jobs** → Add:
- **Command:** `/usr/bin/php /home/<your-user>/public_html/api/backup-news.php`
- **Schedule:** `0 21 * * *` (daily 21:00 UTC ≈ 22:00–23:00 Berlin)

Cron runs via PHP CLI, which bypasses the `?key=` check, so no token is needed in the command.

---

## Optional — local dry-run (before touching Hostinger)

With XAMPP PHP on PATH, you can exercise the GitHub upload/prune logic locally:

1. Create a throwaway private repo + fine-grained PAT (as in Step 1).
2. Create `server/api/backup-config.php` locally with those values (gitignored).
3. Run:
   ```powershell
   php server/api/backup-news.php
   ```
   (CLI bypasses the web `?key=` guard.) Confirm a `news-YYYY-MM-DD.json` commit appears in the repo and `public/data/backups.log` gets a new line.
4. Delete the local `backup-config.php` (and the throwaway repo/PAT) when done.

---

## Verification checklist

- [ ] Private backup repo exists with a `main` branch (has a README).
- [ ] Fine-grained PAT: single repo, **Contents R/W** only, 1-year expiry, reminder set.
- [ ] `backup-config.php` created **on the server**, all 5 keys filled.
- [ ] Browser smoke-test returns `{"ok":true,...}` and a commit appears.
- [ ] Wrong `?key=` returns `403`.
- [ ] Cron job added at `0 21 * * *` with the correct absolute PHP path.
- [ ] Next morning: a new `news-<today>.json` commit exists; `data/backups.log` has the run line.
- [ ] After `retention_days`, oldest files auto-prune (verify once the window elapses).

## Security notes
- `backup-config.php` holds the PAT — it is gitignored and lives only on the server.
- `server/api/.htaccess` denies HTTP download of `backup-config.php` as defense-in-depth.
- Rotate the PAT before its 1-year expiry; update `github_token` in `backup-config.php`.

## References
- Script: `server/api/backup-news.php`
- Template: `server/api/backup-config.example.php`
- Existing docs: `docs/Setup.md` (§ "Daily off-site backup of `news.json`", lines ~226–261)
- Session history: `docs/sessions/session_2026-03-22_07-30_Change latest news by deployee.md` (tasks #72–76)
