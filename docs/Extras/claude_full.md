# Claude.md Full Documentation

This file is a complete backup of the original claude.md file from the project root.

Note: The original claude.md was empty at the time of documentation reorganization.
The main project documentation has been split into separate files in the `/docs` folder:

- **PROJECT_OVERVIEW.md** - Main reference document with project purpose, tech stack, and structure
- **Architecture.md** - Project structure, routing, dependency injection, and build pipeline
- **Angular_Structure.md** - Components, services, and modules documentation
- **UI_Design.md** - Styling conventions, CSS variables, and responsive design
- **Business_Rules.md** - Frontend validation, workflows, and business logic
- **Setup.md** - Development environment setup and common tasks
- **CHANGELOG.md** - Version history and release notes

---

## Original CLAUDE.md Content

(Original file was empty - contained no documentation)

---

## Documentation Structure

For future modifications to this documentation:

1. **Check existing docs** before creating new content
2. **Update relevant file** if information already exists
3. **Create new file** only if adding entirely new topic area
4. **Keep links updated** when moving content
5. **Reference docs folder** in all project documentation

---

## Accessing Documentation

### For AI Assistants

- Start with `PROJECT_OVERVIEW.md` for project context
- Reference architecture for structural decisions
- Check Angular_Structure.md for component details
- Review Business_Rules.md for validation logic
- See Setup.md for development instructions

### For Developers

- **New to project**: Read PROJECT_OVERVIEW.md first
- **Setting up dev environment**: Follow Setup.md
- **Building components**: Review Angular_Structure.md
- **Styling**: Check UI_Design.md
- **Business logic**: Reference Business_Rules.md

### For Documentation Updates

Update the relevant file in `/docs` folder. The PROJECT_OVERVIEW.md serves as the main reference point.

---

## Quick Links

- [Project Overview](./PROJECT_OVERVIEW.md)
- [Architecture Guide](./Architecture.md)
- [Angular Structure & Components](./Angular_Structure.md)
- [UI Design & Styling](./UI_Design.md)
- [Business Rules & Validation](./Business_Rules.md)
- [Setup & Development](./Setup.md)
- [Changelog](./CHANGELOG.md)

---

## Sync History

### 2026-03-22 — Docs Sync #1
Updated PROJECT_OVERVIEW, Architecture, Angular_Structure, Business_Rules, CHANGELOG, and README to reflect:
- Admin system (login + dashboard pages)
- NewsService with HTTP load/save and BehaviorSubject state
- authGuard route protection
- PHP backend endpoint (save-news.php)
- Dynamic news data (news.json)
- HomeComponent migrated from static constants to NewsService
- Updated routing table with admin child routes

### 2026-03-27 — Docs Sync #2
Updated PROJECT_OVERVIEW, Angular_Structure, Business_Rules, and CHANGELOG to reflect:
- `ContentBlock` interface and `BlockType` union type added to `news.model.ts`
- `NewsNotice.content` changed from `string[]` to `ContentBlock[]`
- New `content-block.renderer.ts` utility — pure `renderBlocks()` function with HTML escaping and whitelisted tags
- `LatestNewsComponent` input renamed `textsList` → `blocks`; `bypassSecurityTrustHtml` removed; uses `DomSanitizer.sanitize(SecurityContext.HTML, ...)`
- Admin dashboard textarea replaced by block-builder (type dropdown + plain text input)
- `news.json` migrated to `ContentBlock[]` format

### 2026-04-03 — Docs Sync #3
Updated PROJECT_OVERVIEW, Angular_Structure, Business_Rules, CHANGELOG, and session file to reflect all changes from continuation sessions:
- **Block formatting**: per-block alignment, indent (left/right, 1–10 em), line-height (7 steps); CSS-class-only approach (no `style=""`)
- **Inline bold**: `**text**` → `<strong>` in `processText()` after HTML-escape
- **Date parameters**: `{startDate}`/`{endDate}` in block text (short format) and notice title (long German format `dd. MonthName yyyy`)
- **`RenderContext`** + `processText()` + `blockClasses()` added to `content-block.renderer.ts`
- **Text templates** and **title templates** stored in localStorage; multi-block template support; `TextTemplate.blocks[]` migration
- **`TextAlign`, `IndentDir`, `LineHeight`** types; `TextTemplate`, `TitleTemplate` interfaces added to `news.model.ts`
- **Drag-and-drop + up/down buttons** for block reordering
- **Multiple active notices**: `getActiveNotices()` (plural) in `NewsService`; `HomeComponent` renders all with `@for`
- **"Aktuelles!" section hidden** when no notices active (`@if (activeNotices.length > 0)`)
- **Global `DialogService`** + **`DialogComponent`** replacing browser `prompt()`/`confirm()` in admin dashboard
- **`NG5002` fix**: `@if` inside `<button>` → `[class.d-none]`; bare `{`/`}` → HTML entities
- **`TS2322` fix**: `DialogState.resolve` typed as `any`
- **Title date substitution fix**: `renderedTitle` computed in `LatestNewsComponent.ngOnChanges`
- SCSS `@for` loops for `indent-left-N`/`indent-right-N` and `lh-*` classes in `styles.scss`
- Session file `session_2026-03-22_07-30_Change latest news by deployee.md` updated with tasks 16–33
- Security: XSS prevention and typography enforcement now consolidated in `content-block.renderer.ts`

### 2026-04-09 — Docs Sync #4
Updated PROJECT_OVERVIEW, Architecture, Angular_Structure, Business_Rules, CHANGELOG to reflect:
- **Custom line-height**: `LineHeight` type now `number` (0.5–4.0); SCSS loop generates `.lh-50`–`.lh-400`; renderer uses dynamic class computation; admin has finer presets + "Benutzerdefiniert…" custom input
- **Separator & spacer block types**: `'separator'` → `<hr>`, `'spacer'` → empty line; admin hides text/formatting controls for these types
- **Cache-Control headers in `.htaccess`**: `no-cache` for `index.html`, `immutable` 1yr for hashed JS/CSS, `no-store` for JSON, 30d for images/fonts
- **SHA-256 password hashing**: `auth.utils.ts` with `hashPassword()` + `ADMIN_PASSWORD_HASH`; login stores only hash in localStorage; authGuard checks hash
- Architecture.md: fixed outdated XSS section (was still referencing `bypassSecurityTrustHtml`); added `auth.utils.ts` and `content-block.renderer.ts` to directory tree

### 2026-04-10 — Docs Sync #5
Updated PROJECT_OVERVIEW, Architecture, Angular_Structure, Business_Rules, Setup, CHANGELOG to reflect:
- **Admin persistence refactor**: `AdminDashboardComponent` now owns `notices` as local state; `persistToServer()` rewritten to use new `NewsService.getNoticesSnapshot()` helper instead of subscribing to `getNotices()` inside a callback. Eliminates the re-entrancy bug (synchronous `notices$.next()` inside a live subscriber) and the subscription leak (one per CRUD op).
- **Content filter fix**: `saveNotice()` filter now preserves `separator` / `spacer` blocks regardless of text — previously dropped because they have no text field, causing silent save failures for notices with those block types.
- **Form validation UX**: new `formError` field + Bootstrap `alert-warning` in the admin form replaces silent `return`s; surfaces "Bitte geben Sie einen Titel ein." / "Mindestens ein Inhaltsblock ist erforderlich.".
- **Loading state scaffolding**: `isFormSaving`, `pendingNoticeId` fields wired to button bindings in template (flags remain inert with the current fire-and-forget `persistToServer()` but are in place for future per-button spinner support).
- **Local dev with real PHP backend**: new `proxy.conf.json` forwards `/api/**` from `ng serve` (`:4200`) to `php -S localhost:8001 -t public`; `start:php` npm script added; `start` script now uses the proxy config. `save-news.php` CORS header switched from a hardcoded production origin to an Origin whitelist including `localhost:4200` and `localhost:8001`, reflecting the request Origin only when it matches.
- **Build warning cleanup**: `styles.scss` `.lh-*` generator wrapped division in `calc()` (Dart Sass 2.0 deprecation); `admin-dashboard.component.html` removed redundant `?.` optional chains on non-nullable `ContentBlock` fields (NG8107).

### 2026-04-19 — Docs Sync #6
Updated PROJECT_OVERVIEW, Architecture, Angular_Structure, Business_Rules, CHANGELOG to reflect:
- **Notice visibility logic corrected**: Changed from "visible only when today is within startDate–endDate" to "visible until endDate passes". Start/end dates describe when the clinic is closed — patients need to see the announcement *before* the closure starts. `NewsService.getActiveNotices()` and `AdminDashboardComponent.isCurrentlyActive()` now check only `today <= endDate`.
- **Admin badge text**: Yellow badge changed from "Aktiviert (außerhalb Zeitraum)" to "Aktiviert (abgelaufen)" — the only scenario for yellow is now when the end date has passed.
- **Windows `npm start` fix**: Removed combined `node server/start-php.js & ng serve` script — on Windows, npm runs through `cmd.exe` where `&` is a sequential separator, not a backgrounding operator, so the PHP server blocked forever and `ng serve` never started. Scripts are now separate: `start` = Angular only, `start:php` = PHP only.
- **Timezone bug fix**: `isCurrentlyActive()` normalized `today` and `end` dates but not `start` — `new Date("YYYY-MM-DD")` creates UTC midnight which differs from local midnight in CEST (UTC+2). Added `start.setHours(0,0,0,0)`.
- **`server/` directory**: PHP endpoint moved from `public/api/save-news.php` to `server/api/save-news.php`; new `server/dev-api.js` (Node.js alternative backend); new `server/start-php.js` (PHP server launcher).

### 2026-05-10 — Docs Sync #7
Updated PROJECT_OVERVIEW, Architecture, README, Setup, CHANGELOG to reflect:
- **Bug**: Saving a notice with a new date range failed with `404 Not Found` and HTML body `Cannot POST /api/save-news.php` — the Express-style 404 from webpack-dev-server's fallback handler when its proxy target (PHP on `:8001`) is unreachable. Root cause: the two-terminal workflow from sync #6 required a separately-launched `npm run start:php`; users routinely forgot it.
- **Combined launcher (final fix)**: New `server/start-dev.js` — pure-Node script that spawns `node server/start-php.js` and `node node_modules/@angular/cli/bin/ng.js serve --proxy-config proxy.conf.json` directly with `shell: false`. Output is line-prefixed `[php]` (magenta) / `[ng]` (cyan); if either child exits, the launcher kills the other. `npm start` now invokes it. New `start:ng` script preserves the standalone-Angular fallback. Two-terminal flow remains supported via `start:php` + `start:ng`.
- **Why not `concurrently`**: First attempt installed `concurrently@^9.2.1` for the same purpose, but it failed with `spawn cmd.exe ENOENT`. Diagnosed to a missing `C:\Windows\System32` entry in the user's PATH (sub-paths like `System32\Wbem` are present, the parent dir is not; `Get-Command cmd.exe` returns nothing). `concurrently` resolves the shell by bare name `cmd.exe` on Windows, so any tool with that dependency fails silently in this environment. The custom launcher's `shell: false` invocation bypasses the entire issue. `concurrently` was uninstalled.

### 2026-05-10 (later that day) — Docs Sync #8
Updated PROJECT_OVERVIEW, Architecture, Angular_Structure, Business_Rules, CHANGELOG, README, Setup to reflect two related feature drops:

**A. Preview-before-publish workflow** (lower the risk of a typo/layout glitch going live):
- `NewsService.getNoticeById(id)` — new synchronous lookup ignoring `isActive`/date filters; documented in `Angular_Structure.md`.
- `HomeComponent` reads `?preview=<id>` from `ActivatedRoute.queryParamMap` and renders that single notice in the *real* homepage layout. Yellow site-wide "Vorschaumodus" banner makes it impossible to mistake the preview for the public view. Unknown ID → red `alert-danger` block. Documented in `Angular_Structure.md` + `Business_Rules.md` ("Preview Override" subsection).
- "👁 Auf Website ansehen" `RouterLink` per row in the admin dashboard; `target="_blank"`, `RouterLink` added to standalone imports. Documented in `Angular_Structure.md`.
- `emptyNotice()` now defaults `isActive` to `false` (was `true`). Editing existing notices preserves their state. Workflow hint under the active-toggle suggests: save deactivated → preview → activate. Documented in `Business_Rules.md` ("Recommended Publish Workflow") and `PROJECT_OVERVIEW.md` ("Inactive-by-default on creation").
- Documented "Two Levels of Preview" (in-form quick preview vs. full-page preview link) in `Business_Rules.md`.

**B. Hostinger deployment + daily off-site backup**:
- `NewsService` URLs converted from root-absolute strings to `Location.prepareExternalUrl()` so sub-folder builds (`npm run build:usama-dev` → `--base-href /hausarzt-cottbus/`) work without code branching. Documented in `Angular_Structure.md` (NewsService) and `Architecture.md` (Build & Deployment Pipeline).
- `server/api/backup-news.php` (new) — cron-triggered backup script; uploads `data/news.json` via the GitHub Contents REST API to a private repo as `news-YYYY-MM-DD.json`; same-day re-runs update in place via sha; rolling 30-day prune. Documented in `PROJECT_OVERVIEW.md` (Backend table + Daily off-site backup feature), `Architecture.md` (Backup Endpoint Security), `Business_Rules.md` (Backup Endpoint Access Control + Backup Data Protection).
- `server/api/backup-config.example.php` (new committed template) and `backup-config.php` (gitignored real credentials, lives only on server). `server/api/.htaccess` denies direct download of `backup-config.php`.
- `.gitignore`: added `server/api/backup-config.php`.
- `docs/Setup.md` "Deploying to Hostinger Premium" section: full step-by-step for root and sub-folder test deploys, GitHub PAT creation (fine-grained, single repo, Contents R/W, 1y expiry), hPanel cron job, smoke-test URLs, security notes.
- Build verification: `npx ng build --configuration development` + `npm run copyHtaccess` confirmed clean; `dist/.../api/` contains `backup-news.php`, `backup-config.example.php`, `.htaccess`, and `save-news.php`.

Skipped from this sync (do not apply to this project): `DotNet_Backend.md`, `Database_Model.md` — the project is PHP + flat JSON, not .NET + DB. The skill template references those file names; documenting features that don't exist would violate the "document only what exists" rule.

---

Last Updated: 2026-05-10
Documentation Version: 1.7
