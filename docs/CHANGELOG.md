# Changelog

All notable changes to the Hausarzt Cottbus project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed (2026-04-19)
- **Notice visibility logic**: Changed from "visible only within startDate–endDate range" to "visible until endDate passes". Notices now appear immediately when activated, giving patients advance notice of clinic closures. Affects `NewsService.getActiveNotices()` and `AdminDashboardComponent.isCurrentlyActive()`
- **Admin status badge**: Yellow badge text changed from "Aktiviert (außerhalb Zeitraum)" to "Aktiviert (abgelaufen)" — the only scenario for yellow is now when the end date has already passed

### Fixed (2026-04-18)
- **Windows `npm start` script**: The `&` operator in npm scripts runs through `cmd.exe` on Windows where it means "run sequentially" (not background). Since `node server/start-php.js` blocks forever, `ng serve` never started. Separated into two scripts: `start` runs only `ng serve --proxy-config proxy.conf.json`; PHP server remains separate via `npm run start:php`
- **Timezone bug in `isCurrentlyActive()`**: `new Date("YYYY-MM-DD")` creates a UTC midnight date, but `today` was set to local midnight (CEST, UTC+2). Added `start.setHours(0, 0, 0, 0)` to normalize the start date to local midnight

### Added (2026-04-10)
- **`NewsService.getNoticesSnapshot()`**: Synchronous helper returning `this.notices$.getValue()` — lets the admin component read the current notices list without subscribing to the BehaviorSubject
- **Form validation error display**: `AdminDashboardComponent` has a new `formError: string | null` field and a Bootstrap `alert-warning` block at the top of the form — surfaces "Bitte geben Sie einen Titel ein." / "Mindestens ein Inhaltsblock ist erforderlich." instead of silently aborting
- **Loading-state fields in admin**: `isFormSaving`, `pendingNoticeId` (referenced by HTML for future per-button spinner bindings)
- **Dev-mode PHP backend via XAMPP**:
  - New `proxy.conf.json` at project root — forwards `/api/**` from Angular (`:4200`) to PHP (`:8001`)
  - New `start:php` npm script → `php -S localhost:8001 -t public`
  - `start` script now uses `ng serve --proxy-config proxy.conf.json`

### Changed (2026-04-10)
- **`AdminDashboardComponent.saveNotice()` content filter**: now preserves structural blocks regardless of text. Filter: `b.type === 'separator' || b.type === 'spacer' || b.text.trim() !== ''` (previously dropped separator/spacer blocks because they have no text)
- **`AdminDashboardComponent.persistToServer()` rewritten**: no longer subscribes to `getNotices()` from inside a callback. Now reads via `getNoticesSnapshot()` once, POSTs directly, and manages `saveStatus` itself. Fire-and-forget (returns `void`)
- **`AdminDashboardComponent.saveNotice()` / `deleteNotice()` / `toggleActive()`**: follow a consistent pattern — mutate via `NewsService`, refresh local state via `getNoticesSnapshot()`, call `persistToServer()`. Eliminates the leaked `getNotices().subscribe(n => this.notices = n)` lines that accumulated one subscription per CRUD op
- **`save-news.php` CORS header**: Origin whitelist instead of hardcoded production domain — accepts `https://www.hausarzt-cottbus.de`, `http://localhost:4200`, `http://localhost:8001`; reflects the request `Origin` only when it matches

### Fixed (2026-04-10)
- **Saving a new announcement silently failed** when content contained separator or spacer blocks — the old content filter dropped them and, if no text blocks remained, `return`ed without any user feedback
- **Activate/Deactivate unreliable** — `persistToServer()` subscribed to `getNotices()` and inside the callback invoked `saveNotices()`, which synchronously calls `notices$.next()`. The re-emission re-entered the callback, producing duplicate POSTs and subscription leaks that compounded with every CRUD op. Replaced by the snapshot-based rewrite above
- **Dart Sass 2.0 deprecation warning** in `src/styles.scss:41`: wrapped `$i * 5 / 100` in `calc()` inside the `.lh-*` generator loop
- **Angular template warnings (NG8107)** in `admin-dashboard.component.html`: removed redundant `?.` optional chains on `t.blocks[0].text` / `.type` (non-nullable `ContentBlock` fields)
- **`saveStatus` stuck on 'error' in local dev**: caused by `ng serve` having no PHP interpreter — requests to `/api/save-news.php` returned raw PHP source as text and `HttpClient` failed to parse it as JSON. Fixed by running PHP's built-in server on `:8001` and proxying `/api/**` through Angular's dev proxy

### Added (2026-04-09)
- **Custom line-height**: `LineHeight` type changed from fixed union to `number` (0.5–4.0); SCSS loop generates `.lh-50` through `.lh-400` in 0.05 steps; renderer computes class name dynamically; admin dropdown includes finer presets (0.5–1.4) and "Benutzerdefiniert…" option with custom number input
- **Separator block type**: New `'separator'` BlockType renders `<hr class="my-2">`; added to admin dropdown as "── Trennlinie ──"
- **Spacer block type**: New `'spacer'` BlockType renders `<p class="mb-0">&nbsp;</p>`; added to admin dropdown as "↕ Leerzeile"
- **`auth.utils.ts`**: New utility with `hashPassword()` (SHA-256 via `crypto.subtle`) and `ADMIN_PASSWORD_HASH` constant
- **Cache-Control headers**: `.htaccess` now includes `mod_headers` directives — `no-cache` for `index.html`, `immutable` 1yr for hashed JS/CSS, `no-store` for JSON, 30d for images/fonts

### Changed (2026-04-09)
- `AdminLoginComponent.login()` is now `async` — hashes password with SHA-256 before comparing; stores only the hash in `localStorage`
- `authGuard` checks `localStorage` token against `ADMIN_PASSWORD_HASH` instead of plaintext password
- Separator and spacer blocks hide textarea and formatting controls (alignment, indent, line-height) in admin UI
- `content-block.renderer.ts` line-height handling changed from static `LINE_HEIGHT_CLASS` lookup table to dynamic class computation (`lh-{value*100}`)
- `styles.scss` line-height classes replaced: 7 hand-written rules → SCSS `@for` loop generating 71 classes

### Added (2026-04-03)
- **Inline bold**: `**text**` syntax in block text → `<strong>` at render time; XSS-safe (HTML-escape runs first)
- **Per-block text alignment**: left/center/right via Bootstrap utilities (`text-start`/`text-center`/`text-end`); admin UI toggles
- **Per-block indentation**: left or right, 1–10 em steps; SCSS-generated `indent-left-N`/`indent-right-N` classes; admin UI select + number input
- **Per-block line-height**: 7 steps (1.0–3.0); SCSS-generated `lh-*` classes; admin UI select
- **Date parameters in block text**: `{startDate}` and `{endDate}` in block text replaced at render time with short German date (`dd.MM.yyyy`) via `RenderContext`
- **Date parameters in titles**: `{startDate}` and `{endDate}` in notice title replaced at render time with long German date (`dd. MonthName yyyy`, e.g. `03. Januar 2026`)
- **Text templates** (localStorage `hac_text_templates`): save single block or all blocks as named reusable template; multi-block templates support full clinic-info formatting; migration from old `block` to `blocks[]` format included
- **Title templates** (localStorage `hac_title_templates`): save title text with optional date placeholders; apply with automatic date substitution
- **Drag-and-drop block reordering**: HTML5 native DnD API; `dragSrcIndex`/`dragOverIndex` visual feedback; `dragleave` jitter fix via `el.contains(relatedTarget)`
- **Up/down block reorder buttons** alongside drag handle
- **Multiple simultaneous active notices**: `NewsService.getActiveNotices()` returns all currently matching notices; `HomeComponent` renders all of them with `@for`
- **Hide "Aktuelles" section when empty**: `@if (activeNotices.length > 0)` in `HomeComponent` template
- **"Aktuelles!" once above all cards**: section-level heading in `HomeComponent`; each card shows only its own announcement title
- **Global DialogService** (`src/app/core/services/dialog.service.ts`): `prompt()` → `Promise<string|null>`, `confirm()` → `Promise<boolean>`; replaces all browser dialogs
- **DialogComponent** (`src/app/core/components/dialog/dialog.component.ts/.html`): global overlay host mounted in `AppComponent`; styled card with prompt/confirm variants
- **Admin preview "Aktuelles!" heading**: preview section in admin dashboard now shows the section heading above the notice card
- `TextTemplate` and `TitleTemplate` interfaces added to `news.model.ts`
- `TextAlign`, `IndentDir`, `LineHeight` types added to `news.model.ts`
- `align?`, `indent?`, `indentDir?`, `lineHeight?` fields added to `ContentBlock`
- `RenderContext` interface and `processText()` function added to `content-block.renderer.ts`
- `blockClasses()` helper added to `content-block.renderer.ts`
- Global dialog styles (`.dialog-backdrop`, `.dialog-box`, `dlg-fade-in`/`dlg-slide-in` keyframes) added to `styles.scss`
- SCSS `@for` loops for `indent-left-N`/`indent-right-N` and `lh-*` classes added to `styles.scss`

### Added (2026-03-27 and earlier)
- `ContentBlock` interface and `BlockType` union type in `news.model.ts` — typed plain-text block replacing raw HTML strings in `NewsNotice.content`
- `content-block.renderer.ts` — pure `renderBlocks()` function; maps `ContentBlock[]` to safe HTML using only whitelisted tags and hardcoded project CSS classes; HTML-escapes all user text
- Block-builder UI in admin dashboard: type selector dropdown + plain text input per block row; available types: `paragraph`, `heading`, `bold`, `list-item`, `emergency`
- Documentation structure and guides in `/docs` folder
- `NewsNotice` interface model (`src/app/core/utils/news.model.ts`)
- `NewsService` with HTTP load/save, BehaviorSubject state, localStorage cache, and API key auth
- `authGuard` functional route guard for admin area (`src/app/core/guards/auth.guard.ts`)
- Admin login page (`/admin/login`) with password authentication
- Admin dashboard (`/admin/dashboard`) with full CRUD for news notices, live preview, and server persistence
- Admin routes added to `app.routes.ts` with lazy loading and guard protection
- PHP save endpoint (`public/api/save-news.php`) with `X-API-Key` validation
- Static news data file (`public/data/news.json`) replacing hardcoded constants

### Changed (2026-04-03)
- `LatestNewsComponent` inputs extended: added `title`, `startDate`, `endDate`; `ngOnChanges` now computes `renderedTitle` (long German date format) and passes `RenderContext` to `renderBlocks()`
- `AdminDashboardComponent` migrated from embedded dialog state to `DialogService`; `saveBlockAsTemplate`, `saveAllBlocksAsTemplate`, `deleteNotice` are now `async`
- `AdminDashboardComponent` embedded `@if (dialog)` overlay block removed from template
- `AdminDashboardComponent` SCSS dialog styles removed (moved to global `styles.scss`)
- `HomeComponent` uses `activeNotices: NewsNotice[]` (plural) instead of single `newsList: ContentBlock[]`
- `NewsService.getActiveNotice()` now delegates to `getActiveNotices()[0]` for backwards compatibility
- `AppComponent` imports `DialogComponent` and mounts `<app-dialog>` in template

### Changed (2026-03-27 and earlier)
- `NewsNotice.content` type changed from `string[]` (raw HTML) to `ContentBlock[]` (typed plain-text blocks)
- `LatestNewsComponent` input renamed from `textsList: string[]` to `blocks: ContentBlock[]`; now uses `renderBlocks()` + `DomSanitizer.sanitize()` instead of `bypassSecurityTrustHtml`
- `AdminDashboardComponent` content editor replaced: free-text HTML textarea → block-builder (type selector + plain text)
- `HomeComponent` now loads news dynamically via `NewsService` instead of static `christmasUrlaub` constant
- `app.routes.ts` restructured with admin child routes and `authGuard`

### Fixed (2026-04-03)
- `NG5002: Unclosed block 'if'` — `@if` inside `<button>` replaced with `[class.d-none]` binding; bare `{`/`}` in template text replaced with HTML entities `&#123;`/`&#125;`
- `TS2322` in `DialogService` — `resolve` field typed as `any` to satisfy both `Promise<string|null>` and `Promise<boolean>` resolve function signatures
- `{startDate}`/`{endDate}` in notice title not being substituted — `renderedTitle` computed in `ngOnChanges` with long German format

### Removed (2026-04-03)
- Browser `prompt()` and `confirm()` calls removed from `AdminDashboardComponent`
- Embedded dialog state (`dialog`, `dialogInputValue`, `openPrompt`, `openConfirm`, `closeDialog`, `confirmDialog`) removed from `AdminDashboardComponent`

### Removed (2026-03-27 and earlier)
- `HomeComponent` no longer imports `christmasUrlaub` / `sommarUrlaub` constants (still exist in `models_interfaces.ts` but unused)

---

## [0.0.0] - Initial Release

### Added
- Angular 19.2.0 setup with standalone components
- Page components: Home, About, Team, Contact, Performances, Arrival, Privacy Policy, Impressum
- Reusable UI components: Header, Footer, Hero, Cards, Carousel, etc.
- Core services: ScrollTracker, WindowService
- Custom animation library with 60+ animations
- ng-zorro-antd integration for enterprise UI components
- Bootstrap 5 for responsive grid and utilities
- Owl Carousel for image galleries
- Google Maps integration for practice location
- Responsive design with mobile-first approach
- SCSS styling with CSS custom properties
- Development server setup
- Production build configuration with asset optimization
- Unit testing setup with Karma and Jasmine

---

## Version Format

### Major Changes (X.0.0)
- Breaking changes to API or routing
- Major new features
- Significant refactoring
- Update dependencies across multiple packages

### Minor Changes (0.X.0)
- New features that are backwards compatible
- New components or services
- Enhancements to existing features
- Bug fixes

### Patch Changes (0.0.X)
- Small bug fixes
- Documentation updates
- Performance improvements
- Minor UI tweaks

---

## Future Roadmap

### Planned Features

#### Phase 1: Enhanced Content
- [x] Dynamic news section with admin management
- [ ] Staff member search and filtering
- [ ] Advanced search functionality
- [ ] Image gallery with lightbox

#### Phase 2: Interactivity
- [ ] Online appointment booking system
- [ ] Patient portal login
- [ ] Live chat support
- [ ] Contact form with email integration
- [ ] Newsletter subscription

#### Phase 3: Performance & SEO
- [ ] Implement service worker for offline support
- [ ] Progressive Web App (PWA) features
- [ ] Enhanced SEO with structured data
- [ ] Performance optimization and caching
- [ ] Internationalization (i18n) support

#### Phase 4: Administration
- [x] Admin dashboard for news content management
- [x] Admin login with route guard protection
- [ ] Appointment management system
- [ ] Staff scheduling system
- [ ] Analytics dashboard
- [ ] Email marketing integration

---

## How to Update This Changelog

### When Making Changes

1. Add entry under `[Unreleased]` section
2. Use appropriate category: Added, Changed, Fixed, Removed
3. Provide clear description of change
4. Reference issue or PR number if applicable

### Example Entry

```markdown
### Added
- New component for patient reviews (#42)
- Performance improvement for carousel on mobile devices
- Documentation for animation library

### Fixed
- Email validation regex not accepting some valid formats (fixes #41)
- Mobile menu not closing after navigation
```

### Releasing a Version

1. Create a new section with version number and date
2. Keep the `[Unreleased]` section empty or with header only
3. Update version in `package.json`
4. Create a git tag: `git tag v0.1.0`
5. Push tag: `git push origin v0.1.0`

---

## Release Checklist

Before releasing a new version:

- [ ] All tests passing (`npm run test`)
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Git tag created
- [ ] Release notes prepared
- [ ] Deployment verification completed

---

## Notes

- Versions prior to 1.0.0 may have breaking changes
- All dates in YYYY-MM-DD format
- Semantic versioning followed strictly
- Breaking changes highlighted in MAJOR version updates
