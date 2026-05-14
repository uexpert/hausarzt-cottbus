# Setup & Development Guide

## Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn 3.x)
- **Git**: 2.20 or higher
- **Operating System**: Windows, macOS, or Linux

### Verify Prerequisites

```bash
node --version     # Should be v18.x or higher
npm --version      # Should be 9.x or higher
git --version      # Should be 2.20 or higher
```

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/hausarzt-cottbus.git
cd hausarzt-cottbus
```

### 2. Install Dependencies

```bash
npm install
# or if using yarn
yarn install
```

This will install all packages listed in `package.json`, including:
- Angular and related packages
- ng-zorro-antd for UI components
- Testing frameworks (Karma, Jasmine)
- TypeScript and compilation tools

### 3. Verify Installation

```bash
ng version
# Should show Angular CLI version 19.2.0+

npm list @angular/core
# Should show Angular core version 19.2.0+
```

## Development Environment

### Starting the Development Server

Local development needs both the Angular dev server (frontend on `:4200`) and a PHP process (admin save endpoint on `:8001`). A single command starts both:

```bash
npm start
```

This runs `node server/start-dev.js`, a tiny launcher that spawns both processes directly (no shell) with `[php]` / `[ng]` prefixed output:

- `node server/start-php.js` → `php -S localhost:8001 -t server/` (requires PHP on `PATH`; XAMPP's `C:\xampp\php` works on Windows)
- `node node_modules/@angular/cli/bin/ng.js serve --proxy-config proxy.conf.json`

If either child process exits, the launcher kills the other so a half-broken dev environment can't silently swallow admin saves. Ctrl+C terminates both.

The application will be available at:
- **Local**: `http://localhost:4200/`
- **Network**: `http://[your-ip]:4200/`

The `proxy.conf.json` forwards requests to `/api/**` from Angular (`:4200`) to PHP (`:8001`), so `/api/save-news.php` is executed by PHP and writes to `public/data/news.json` exactly as in production. Static files (including `/data/news.json` and all assets) continue to be served directly by `ng serve`.

**Run the servers individually if you prefer two terminals:**
```bash
npm run start:php   # terminal 1: PHP backend on :8001
npm run start:ng    # terminal 2: Angular dev server on :4200
```

PHP is now a hard requirement — the admin endpoints (`login.php`, `logout.php`, `whoami.php`, `save-news.php`) need a real PHP interpreter. XAMPP works fine on Windows; on macOS/Linux the system `php` binary is usually sufficient.

### One-time local auth setup

Before the admin dashboard works locally you need an `auth-config.php` next to the committed `auth-config.example.php`:

```bash
# 1. Copy the template
cp server/api/auth-config.example.php server/api/auth-config.php

# 2. Generate a bcrypt hash of your chosen dev password and paste it into
#    the new file under 'admin_password_hash'. Example:
php -r 'echo password_hash("your-dev-password", PASSWORD_BCRYPT, ["cost" => 12]) . PHP_EOL;'
```

The resulting `server/api/auth-config.php` is gitignored, so the dev password never leaves your machine. Without this file, every call to `/api/login.php` returns `500: auth-config.php missing on server`.

The development server includes:
- Hot module replacement (HMR)
- Automatic recompilation on file changes
- Browser live reload
- Detailed error messages

### Frontend-only quick start (no admin persistence)

If you only need to view public pages and do not need to save admin changes, you can run `npm run start:ng` alone — but the admin dashboard save/toggle/delete actions will show an error because `/api/save-news.php` will not execute.

### Development Server Options

```bash
# Start with specific port
ng serve --port 4300

# Start with polling (if file watching doesn't work)
ng serve --poll=2000

# Disable live reload
ng serve --live-reload=false

# Open browser automatically
ng serve --open
```

## Building for Production

### Standard Production Build

```bash
npm run build
# or
ng build
```

Output: `dist/hausarzt-cottbus/`

### Production Build with Custom Base Href

For deploying to a subdirectory (e.g., `example.com/hausarzt-cottbus/`):

```bash
npm run build:usama-dev
# which runs: ng build --base-href /hausarzt-cottbus/
```

This also copies the `.htaccess` file for routing support.

### Build Options

```bash
# Production optimized build
ng build --configuration production

# Development build (unoptimized, with source maps)
ng build --configuration development

# Build with stats JSON for analysis
ng build --stats-json

# Watch for changes and rebuild
ng build --watch
```

### Build Output Structure

```
dist/hausarzt-cottbus/browser/
├── index.html           # Main HTML file
├── *.js / *.css         # Hashed bundles
├── assets/              # Static assets (images, jQuery, etc.)
├── data/                # Copied from /public/data — contains news.json
│   └── news.json
├── api/                 # Copied from /server/api by copy-htaccess.js
│   ├── save-news.php
│   ├── backup-news.php
│   ├── backup-config.example.php
│   └── .htaccess
└── .htaccess            # Apache routing + cache headers
```

The whole contents of `dist/hausarzt-cottbus/browser/` is what gets uploaded to the hosting server (Hostinger's `public_html/` for a root deploy, or `public_html/<subfolder>/` for a sub-folder deploy).

## Deploying to Hostinger Premium

The clinic site runs on **Hostinger Premium (Web Hosting)** — shared Apache + PHP, no SSH, but cron jobs and PHP CLI are available. The same instructions apply to any Apache+PHP shared host.

### One-time hPanel checks
1. **PHP enabled** — hPanel → Advanced → PHP Configuration → pick **PHP 8.1+**.
2. **`mod_rewrite` and `mod_headers`** — both are enabled by default; required by `src/assets/.htaccess` for SPA routing and cache headers.

### Production deploy (root domain `hausarzt-cottbus.de`)

1. Build locally:
   ```bash
   npm run build
   ```
2. Upload the entire contents of `dist/hausarzt-cottbus/browser/` into the live account's `public_html/` (File Manager or FTP — credentials in hPanel → Files → FTP Accounts).
3. Set permissions once after first upload:
   - `public_html/data/`           → `755`
   - `public_html/data/news.json`  → `644`
   - `public_html/api/*.php`       → `644`
4. Open `public_html/api/auth-helpers.php` and confirm the CORS whitelist (`$allowed` array in `set_cors_headers()`) contains the production domain.
5. **Create `public_html/api/auth-config.php`** by copying `auth-config.example.php` and pasting a bcrypt hash of the real admin password. Generate the hash with the same `php -r 'echo password_hash(...)'` one-liner shown above, ideally on a trusted machine — never via a public hash generator. Store the plaintext password in a password manager; the server only ever sees the hash.
6. Smoke test: visit `/admin/login` → log in → toggle a notice → confirm the green save banner. Check DevTools → Application → Cookies that `hac_session` is present with `HttpOnly`, `Secure`, and `SameSite=Strict`.

**Rotating the admin password later:** regenerate the bcrypt hash and overwrite `admin_password_hash` in `auth-config.php`. Existing sessions remain valid until expiry; delete `data/sessions.json` to invalidate them immediately.

### Test deploy (sub-folder, e.g. `test-host.example.com/hausarzt-cottbus/`)

For validating changes on a separate Hostinger test account *before* touching the live domain:

1. Build with sub-folder base href:
   ```bash
   npm run build:usama-dev
   ```
   This sets `--base-href /hausarzt-cottbus/`, so Angular Router and asset URLs are all prefixed.
2. On the test account, create `public_html/hausarzt-cottbus/` and upload the entire contents of `dist/hausarzt-cottbus/browser/` into it.
3. Apply the same permissions as above, but inside `public_html/hausarzt-cottbus/`.
4. Edit `public_html/hausarzt-cottbus/api/save-news.php` → add the test account's origin to `$allowedOrigins` (just `scheme://host`, no path).
5. Smoke test URLs:
   - Public:        `https://test-host.example.com/hausarzt-cottbus/`
   - Admin login:   `https://test-host.example.com/hausarzt-cottbus/admin/login`
   - Preview link:  `https://test-host.example.com/hausarzt-cottbus/home?preview=<noticeId>`

`NewsService` uses `Location.prepareExternalUrl()` so both `/data/news.json` and `/api/save-news.php` automatically pick up the `<base href>` — no further code changes between root and sub-folder deploys.

### Daily off-site backup of `news.json` (private GitHub repo)

`server/api/backup-news.php` is a cron-triggered script that uploads `data/news.json` to a private GitHub repo as `news-YYYY-MM-DD.json`, with a 30-day rolling retention. Each upload becomes a real git commit, giving you a full audit log of every admin save for free.

**One-time GitHub setup** (do once for the test account, repeat with a separate token/repo for production):
1. Create a **private** repo (e.g. `hausarzt-cottbus-backups`) with an initial README so `main` exists.
2. Settings → Developer settings → **Personal access tokens → Fine-grained tokens** → Generate new token:
   - Resource owner: your user
   - Repository access: *Only select repositories* → the backup repo
   - Permissions → Repository → **Contents: Read and write**
   - Expiration: 1 year. **Set a calendar reminder to rotate before it expires.**
3. Copy the `github_pat_…` token (shown once).

**One-time Hostinger setup:**
1. After uploading the build, you'll find `public_html/api/backup-config.example.php` (or `…/hausarzt-cottbus/api/…` for the sub-folder deploy). In File Manager, **copy** it next to itself and rename the copy to `backup-config.php`.
2. Edit `backup-config.php` and fill in:
   - `github_owner` — your GitHub username.
   - `github_repo` — the backup repo name.
   - `github_token` — the PAT created above.
   - `backup_trigger_token` — any long random string (used for manual ?key= testing).
   - `retention_days` — `30` (or whatever you prefer).
3. hPanel → Advanced → Cron Jobs → Add new:
   - Command: `/usr/bin/php /home/<your-user>/public_html/api/backup-news.php`
     (for the sub-folder deploy: `…/public_html/hausarzt-cottbus/api/backup-news.php`)
   - Schedule: `0 21 * * *` (daily 21:00 UTC ≈ 22:00 Berlin in winter, 23:00 in summer).

**Smoke-test it without waiting for cron:**
```
https://<host>/api/backup-news.php?key=<backup_trigger_token>
```
A successful run prints `{"ok":true,"uploaded":"news-YYYY-MM-DD.json","updated":false,"pruned":0,"errors":[]}`. The GitHub repo should show a new commit for today's file. Re-triggering the same day reports `"updated":true` (overwrites in place — only one file per day).

**Security notes:**
- `backup-config.php` is gitignored and lives only on the server. The committed template `backup-config.example.php` contains placeholders only.
- `server/api/.htaccess` denies direct download of `backup-config.php` as defense-in-depth.
- Without `?key=…`, browser-triggered requests get a `403 forbidden`. Only the cron (running via PHP CLI) bypasses this check.

## Configuration

### Angular Configuration

**File**: `angular.json`

Key settings:
- `sourceRoot`: `src`
- `prefix`: `app` (for component selectors)
- `inlineStyleLanguage`: `scss`
- `styles`: Global stylesheet paths
- `scripts`: Third-party JS libraries

### Build Budgets

Configured in `angular.json`:
- Initial bundle: 4MB warning, 8MB error
- Component styles: 1MB warning, 2MB error

If exceeded, optimize with:
- Lazy loading for routes
- Component splitting
- Removing unused dependencies
- Code optimization

### TypeScript Configuration

**File**: `tsconfig.json`

Key settings:
- `target`: ES2022
- `lib`: ES2022, DOM, DOM.Iterable
- `moduleResolution`: "bundler"
- `strict`: true (strict type checking enabled)

### Environment Configuration

**Files**:
- `src/environments/environment.ts` (production)
- `src/environments/environment.development.ts` (development)

```typescript
// environment.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};

// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

Access in code:
```typescript
import { environment } from '../environments/environment';

if (environment.production) {
  // Production-only code
}
```

## Testing

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (re-run on file change)
ng test --watch

# Run tests once (CI mode)
ng test --watch=false

# Generate coverage report
ng test --code-coverage
# Report available in `coverage/`
```

### Test Files

Test files located alongside component files:
- `component.component.spec.ts` - Unit tests for component

### E2E Tests

End-to-end tests (if configured):
```bash
ng e2e
```

## Debugging

### Development Tools

1. **Angular DevTools**
   - Browser extension for Chrome
   - Inspect component state
   - Performance profiling
   - Dependency injection inspection

2. **Chrome DevTools**
   - F12 or Ctrl+Shift+I
   - JavaScript debugging
   - Network monitoring
   - Performance analysis

### Debugging Tips

```bash
# Start with source maps enabled
ng serve --source-map

# Debug in VS Code
# Add to .vscode/launch.json:
{
  "type": "chrome",
  "request": "launch",
  "name": "Angular Debug",
  "url": "http://localhost:4200",
  "webRoot": "${workspaceFolder}"
}
```

### Console Logging

```typescript
// Check environment
console.log(environment.production); // false in dev, true in prod

// Component lifecycle logging
ngOnInit() {
  if (!environment.production) {
    console.log('Component initialized');
  }
}
```

## Code Style & Linting

### TypeScript Linting

```bash
# Check code style (if linting configured)
ng lint

# Fix auto-fixable issues
ng lint --fix
```

### Code Formatting

Using Prettier (if configured):

```bash
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .
```

## File Organization

### Component Structure

```
component-name/
├── component-name.component.ts       # Component class
├── component-name.component.html     # Template
├── component-name.component.scss     # Styles
└── component-name.component.spec.ts  # Tests
```

### Service Structure

```
service-name.service.ts              # Service implementation
service-name.service.spec.ts         # Unit tests
```

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/feature-name
git add .
git commit -m "Add feature description"
git push origin feature/feature-name
```

### Creating a Pull Request

After pushing, create a PR on GitHub with:
- Clear description of changes
- Reference to any related issues
- Testing notes

### Committing Changes

Use semantic commit messages:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (formatting, semicolons)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Build, dependencies, tooling

Example:
```bash
git commit -m "feat: add scroll-to-top button"
git commit -m "fix: correct header navigation highlighting"
```

## Troubleshooting

### Port Already in Use

```bash
# Use different port
ng serve --port 4300

# Or kill process on port 4200 (macOS/Linux)
lsof -ti:4200 | xargs kill -9
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Compilation Errors

```bash
# Full rebuild
ng build --configuration development

# Check TypeScript errors
npx tsc --noEmit
```

### Dependencies Conflict

```bash
# Check for outdated packages
npm outdated

# Update packages safely
npm update

# Update Angular specifically
ng update @angular/cli @angular/core
```

### Build Size Too Large

```bash
# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/hausarzt-cottbus/stats.json

# Identify large dependencies
npm ls [package-name]
```

## IDE Setup

### VS Code Configuration

Recommended extensions:
- Angular Language Service
- Prettier
- ESLint
- TypeScript Vue Plugin
- HTML CSS Support

Settings in `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm Configuration

- IntelliJ IDEA Ultimate or WebStorm includes Angular support
- Enable Angular plugin in settings
- Configure code style for SCSS

## Environment-Specific Development

### Local Development

- Use `ng serve` with auto-reload
- Source maps enabled
- Full error messages
- Development environment variables

### Testing Environment

- Production build locally: `ng build --configuration production`
- Verify bundle size
- Test performance
- Test with real data

### Production Simulation

```bash
# Build production version
ng build --configuration production

# Serve locally to test
npx http-server dist/hausarzt-cottbus/

# Visit http://localhost:8080/
```

## Common Tasks

### Generate New Component

```bash
ng generate component components/component-name
# or shorthand
ng g c components/component-name
```

### Generate Service

```bash
ng generate service core/services/service-name
ng g s core/services/service-name
```

### Generate Directive

```bash
ng generate directive core/directives/directive-name
```

### Generate Pipe

```bash
ng generate pipe core/pipes/pipe-name
```

## Next Steps

1. Read `PROJECT_OVERVIEW.md` for project structure
2. Review `Architecture.md` for design patterns
3. Check `Angular_Structure.md` for component details
4. See `UI_Design.md` for styling guidelines
5. Consult `Business_Rules.md` for validation logic
