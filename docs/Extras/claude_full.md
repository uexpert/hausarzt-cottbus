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

---

Last Updated: 2026-04-09
Documentation Version: 1.3
