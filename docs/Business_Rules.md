# Business Rules & Frontend Validation

## Overview

This document outlines the business logic, validation rules, and workflows implemented on the frontend for the Hausarzt Cottbus medical practice website.

## Contact Form Validation

### Input Fields

The contact form typically includes:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Phone**: Optional, but if provided must be valid format
- **Subject**: Required, minimum 5 characters
- **Message**: Required, minimum 10 characters

### Validation Rules

#### Name Field
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Pattern**: Letters, spaces, hyphens allowed
- **Error Message**: "Please enter a valid name (2-50 characters)"

#### Email Field
- **Required**: Yes
- **Format**: Valid email address (RFC 5322 pattern)
- **Max Length**: 100 characters
- **Error Message**: "Please enter a valid email address"

#### Phone Field
- **Required**: No
- **Format**: Valid phone number (+ followed by digits and dashes)
- **Pattern**: `^\+?[\d\s\-()]+$`
- **Min Length**: 7 characters
- **Error Message**: "Please enter a valid phone number"

#### Subject Field
- **Required**: Yes
- **Min Length**: 5 characters
- **Max Length**: 100 characters
- **Error Message**: "Subject must be 5-100 characters"

#### Message Field
- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 5000 characters
- **Error Message**: "Message must be 10-5000 characters"

### Submission Workflow

1. **Validation Check**: All fields validated before submission
2. **Loading State**: Submit button disabled with loading indicator
3. **API Call**: Form data sent to backend service
4. **Success Response**:
   - Confirmation message displayed
   - Form reset to empty state
   - Redirect or success toast notification
5. **Error Response**:
   - Error message displayed
   - Form data preserved for user correction
   - Specific error details shown if available

### Error Handling

- **Validation Errors**: Shown below each field as user types
- **Submission Errors**: Displayed as toast or alert modal
- **Network Errors**: Retry mechanism with user notification
- **Server Errors**: Generic error message to user, details logged

## Appointment/Request Validation

If appointment booking exists:

### Date/Time Validation
- **Minimum Date**: Today or tomorrow (depending on practice hours)
- **Maximum Date**: 90 days in advance
- **Valid Hours**: Practice operating hours only
- **Blocked Dates**: Holidays and days off

### Service Selection
- **Required**: Yes
- **Options**: Dynamically loaded from backend
- **Error**: "Please select a service"

## Navigation & Routing

### Active Route Highlighting

**HeaderComponent** uses `ScrollTrackerService` to highlight active navigation:
- Tracks scroll position on page
- Identifies which section user is viewing
- Highlights corresponding nav link
- Updates as user scrolls

### Route Guards

**Implemented**:
- `authGuard` (`CanActivateFn`): Protects `/admin/dashboard`. Checks `localStorage` for `admin_token`. Redirects to `/admin/login` if missing or invalid.

**Not yet implemented**:
- `CanDeactivate`: Warn user before leaving unsaved form

### Link Validation

All internal links validated:
- Links point to existing routes
- External links open in new tab with `rel="noopener noreferrer"`
- Hash links scroll to element smoothly with offset for header

## Form State Management

### Form States

1. **Pristine**: Form not modified, no errors shown
2. **Dirty**: Form has been modified by user
3. **Touched**: Form field has been focused and blurred
4. **Valid**: All validations pass
5. **Invalid**: One or more validation errors
6. **Pending**: Async validation in progress
7. **Submitted**: Form submission attempted
8. **Submitting**: Form data being sent to backend

### State Behavior

- **Show Errors Only If**:
  - Field is dirty/touched, AND
  - Field has validation errors, OR
  - Form has been submitted

- **Disable Submit Button When**:
  - Form is invalid, OR
  - Form is currently submitting

## Content Management Rules

### News/Updates Display (Dynamic)

**Data Source**: `public/data/news.json` loaded via `NewsService`

**Active Notice Resolution**:
- `NewsService.getActiveNotices()` returns **all** notices where:
  - `isActive === true`, AND
  - Today's date has not passed `endDate` (inclusive, end of day)
- Notices are visible **before** their start date — the start/end dates describe when the clinic is closed, not when the announcement becomes visible. Patients need advance notice of closures.
- If no notices match, the "Aktuelles" section is hidden entirely (`@if (activeNotices.length > 0)`)

**Preview Override**:
- If the URL contains `?preview=<noticeId>`, `HomeComponent` bypasses `getActiveNotices()` and renders only that specific notice via `NewsService.getNoticeById(id)`, ignoring both `isActive` and the date range.
- A yellow site-wide banner is shown at the top: *"Vorschaumodus — diese Meldung ist nur sichtbar, weil ein ?preview= Parameter gesetzt ist. Für Besucher der Website ist sie nicht zu sehen, solange sie nicht aktiviert ist."*
- An unknown ID surfaces a red `alert-danger` block, not a silent blank page.
- This preview link is **not security-sensitive**: notice IDs are timestamps and a casual visitor cannot guess them, but anyone with the link can view the notice. Treat preview links as semi-private; do not share them publicly.

**Display**:
- "Aktuelles!" heading appears once as a section heading above all active notice cards
- Each active notice is rendered by its own `<latest-news>` card, showing the notice `title` below "Aktuelles!"
- `renderBlocks()` converts each block's plain text to HTML using its `type` and optional formatting (alignment, indent, line-height)
- Typography is enforced by the renderer — hardcoded project CSS classes only, no inline styles

**Date Parameters in Content**:
- Block text may contain `{startDate}` and `{endDate}` markers — replaced at render time with short German format (`dd.MM.yyyy`)
- Notice `title` may contain `{startDate}` and `{endDate}` markers — replaced at render time with long German format (`dd. MonthName yyyy`, e.g. `03. Januar 2026`)

### News Admin Dashboard

**Location**: `/admin/dashboard` (protected by `authGuard`)

**CRUD Operations**:
- **Create**: New notice with title, start/end dates, active flag, and block-builder content. **Default `isActive` is `false`** — newly created notices are inactive and must be explicitly activated by the admin after previewing. This prevents accidental publication of unfinished or unverified notices.
- **Read**: Lists all notices with status badges
- **Update**: Edit any field of an existing notice. Editing **preserves** the current `isActive` state — a small typo fix to a live notice does not yank it offline.
- **Delete**: Confirmation via `DialogService.confirm()` (no browser `confirm()`)

**Recommended Publish Workflow** (suggested by the in-form hint under the Aktiv-Schalter):
1. Create or edit notice with `isActive = false` (the default for new notices)
2. Save the deactivated notice
3. Click "👁 Auf Website ansehen" on the row → public homepage opens in a new tab with the notice rendered in real layout (yellow Vorschaumodus banner is shown)
4. Verify the rendering, then return to the admin tab
5. Click "Aktivieren" to make the notice publicly visible

**Block-Builder Content Editor**:
- Admin selects a block type per row (dropdown): `Absatz`, `Überschrift`, `Fettgedruckt`, `Listenpunkt`, `Notfallhinweis`, `── Trennlinie ──`, `↕ Leerzeile`
- `Trennlinie` renders a horizontal rule (`<hr>`); `Leerzeile` renders an empty line — both hide the text input and formatting controls
- Admin enters plain text only — no HTML tags or styles are accepted or rendered
- Formatting applied automatically by `renderBlocks()` using the chosen block type
- Per-block formatting controls: alignment (left/center/right via Bootstrap utilities), indent (left/right, 1–10 em, via SCSS-generated classes), line-height (preset steps + custom 0.5–4.0 in 0.05 increments, via SCSS-generated `.lh-50` through `.lh-400` classes)
- Inline bold: `**text**` within block text → `<strong>` at render time
- Date parameters: `{startDate}` / `{endDate}` in block text → replaced with short German date at render time
- Block order: drag-and-drop (HTML5 DnD) + up/down buttons

**Templates**:
- **Text templates** (localStorage `hac_text_templates`): Save one block (⭐ per block) or all blocks ("⭐ Alle als Vorlage") as a named reusable template; insert via "+ Einfügen"
- **Title templates** (localStorage `hac_title_templates`): Save the current title text with optional `{startDate}`/`{endDate}` markers; on "Übernehmen" markers are substituted with the notice's current dates (German long format)

**Status Badges**:
- "Aktiv & Sichtbar" (green): `isActive === true` AND `endDate` has not yet passed
- "Aktiviert (abgelaufen)" (yellow): `isActive === true` BUT `endDate` has already passed
- "Deaktiviert" (grey): `isActive === false`

**Form Validation (Save)**:
- Title must not be empty (after `trim()`) → alert: "Bitte geben Sie einen Titel ein."
- Content must contain at least one block → alert: "Mindestens ein Inhaltsblock ist erforderlich."
- Content-block filter on save: **structural blocks** (`separator`, `spacer`) are always preserved; text blocks (`paragraph`, `heading`, `bold`, `list-item`, `emergency`) are dropped only if their text is empty. A notice built entirely from separators/spacers is valid.
- Validation errors are shown inline as a Bootstrap `alert-warning` inside the form (`formError` field); the save does **not** proceed until resolved.

**Persistence Workflow**:
1. Component mutates its local `notices` list and mirrors the change through `NewsService` (`addNotice`/`updateNotice`/`deleteNotice`) so the home page's `BehaviorSubject` cache stays in sync
2. `persistToServer()` reads the current state via `getNoticesSnapshot()` and calls `saveNotices()`
3. `saveNotices()` writes to localStorage and POSTs to `/api/save-news.php` with `X-API-Key` header
4. PHP endpoint validates the key, decodes the JSON body, and writes to `public/data/news.json`
5. Save status shown to admin via a top-of-page banner: "💾 Wird gespeichert…" → "✅ Erfolgreich gespeichert!" / "❌ Fehler beim Speichern."

**Two Levels of Preview**:
1. **In-form preview** — "👁 Vorschau" button inside the create/edit form renders the current draft using the same `LatestNewsComponent` used on the public site, with the "Aktuelles!" heading above the card. Good for quick visual checks while editing.
2. **Full-page preview** — "👁 Auf Website ansehen" link per row (only available for *saved* notices). Opens `/home?preview=<noticeId>` in a new tab; `HomeComponent` renders the notice within the actual public homepage (header, hero, layout, mobile breakpoints), regardless of `isActive` or date range. The yellow Vorschaumodus banner makes it impossible to mistake the preview for the public view.

**Dialog System**:
- All interactive confirmations and text prompts use `DialogService` (application-specific modal overlays)
- No browser `prompt()`, `confirm()`, or `alert()` calls exist in the admin dashboard
- `DialogService` is global — future components get the same dialog styling automatically by injecting the service

### Team Member Display

**Sorting**:
- Primary: By title/role (Doctor, Assistant, etc.)
- Secondary: By name alphabetically

**Filtering**:
- By specialty (if applicable)
- By availability (if applicable)

**Required Fields**:
- Name
- Title/Position
- Photo
- Contact information

### Services Display

**Sorting**:
- By importance/frequency
- By category

**Categories**:
- General Medicine
- Dermatology
- Preventive Care
- Other Specialties

## Security Rules

### Admin Authentication

- **Login**: Password hashed with SHA-256 via native `crypto.subtle` and compared against pre-computed `ADMIN_PASSWORD_HASH` (in `core/utils/auth.utils.ts`)
- **Token**: On success, only the SHA-256 hash is stored in `localStorage` as `admin_token` — plaintext password is never persisted
- **Guard**: `authGuard` checks stored hash against `ADMIN_PASSWORD_HASH` before allowing dashboard access
- **Logout**: Clears `localStorage` token and redirects to `/admin/login`

### API Security

- **Save endpoint**: `/api/save-news.php` accepts POST only
- **Authentication**: `X-API-Key` header validated against server-side secret
- **CORS**: Origin whitelist — `https://www.hausarzt-cottbus.de`, `http://localhost:4200`, `http://localhost:8001`; reflects request `Origin` only when it matches. Sub-folder test deploys add the test host (origin only — the `/hausarzt-cottbus/` path is never part of `Origin`).
- **Input Validation**: JSON body decoded and validated as array before writing

### Backup Endpoint Access Control

- **Endpoint**: `server/api/backup-news.php`
- **CLI invocation** (Hostinger cron): allowed unconditionally — `php_sapi_name() === 'cli'` short-circuits the gate.
- **Web invocation** (browser): requires `?key=<backup_trigger_token>` in the URL. The token is configured in `backup-config.php` and is **not** the same as the GitHub PAT — it only guards manual web-triggered runs (debug / smoke tests).
- Without the token, web requests return `403 forbidden`. The endpoint cannot be casually triggered by visitors.

### Backup Data Protection

- **What is backed up**: `data/news.json` only. localStorage-only data (`hac_text_templates`, `hac_title_templates`) lives in each admin's browser and is **not** backed up. Templates lost on browser data clear cannot be recovered.
- **Where**: A private GitHub repository (one repo per environment — test and production each get their own).
- **Retention**: rolling 30 days. Each daily run uploads `news-YYYY-MM-DD.json` and deletes any older file matching the pattern. The repo's commit log itself is permanent — even pruned filenames remain in history.
- **Recovery procedure**: clone the backup repo, pick the desired commit / dated file, download its `news-YYYY-MM-DD.json`, upload it to the server as `public_html/.../data/news.json`, refresh the site.
- **GitHub credential scope**: fine-grained Personal Access Token limited to **one** repo with only `Contents: Read and write`. PAT expiry is 1 year — set a calendar reminder; rotation is a one-line edit to `backup-config.php`.
- **Production vs. test environments**: use **separate** PATs and (recommended) **separate** repos so the test environment's noise never contaminates production audit history.

### Input Sanitization

- **News Content**: Admin enters plain text only. `renderBlocks()` processing order: HTML-escape → `{startDate}`/`{endDate}` substitution (dates are also escaped) → `**bold**` → `<strong>`. Output is then passed through `DomSanitizer.sanitize(SecurityContext.HTML, ...)`. `bypassSecurityTrustHtml` is **not** used anywhere.
- **XSS Prevention**: `<script>`, event handlers (`onerror`, `onclick`, …), `<iframe>`, and inline `style=""` attributes cannot appear in rendered news content — the renderer never writes them.
- **CSS Classes Only**: All formatting (alignment, indent, line-height) uses whitelisted CSS class names. `DomSanitizer` allows `class=""` attributes; `style=""` is intentionally avoided and would be stripped anyway.
- **Typography Constraints**: CSS classes are hardcoded in `content-block.renderer.ts`. Users cannot inject custom colors, font sizes, or styles.
- **Other Content**: Angular built-in sanitization for all other dynamic content

### GDPR & Privacy

- **Cookie Consent**: Displayed on first visit
- **Data Collection**: Only necessary data collected
- **User Rights**: Privacy policy available, contact form notice included
- **Retention**: Data handled per privacy policy

### Contact Form Privacy

- **GDPR Notice**: Users notified data will be processed
- **Consent**: Checkbox for consent to contact (if required by law)
- **Data Handling**: Backend email service only, no third-party APIs

## Business Hours & Availability

### Display Rules

**Opening Hours**:
- Displayed in consistent format across site
- Shows current day/time status (open/closed)
- Color indicators: Green (open), Red (closed)

**Appointment Availability**:
- Only show future dates within operating hours
- Block out holidays/closed days
- Show estimated response time for inquiries

### Auto-Response Messages

**Contact Form Submission**:
- Immediate confirmation to user
- Estimated response timeframe (e.g., "We'll respond within 24 hours")
- Message adjusted for after-hours submissions

## Accessibility & UX Rules

### Language & Content

- **German Primary**: Content primarily in German
- **English Support**: Key pages may have English version
- **Clear Language**: Use simple, patient-friendly language
- **Medical Terminology**: Explain complex terms or use common alternatives

### Responsive Behavior

**Mobile (< 576px)**:
- Single column layout
- Larger touch targets (44x44px minimum)
- Simplified navigation
- Hidden by default: Non-essential content

**Tablet (576px - 991px)**:
- Two column layout where applicable
- Optimized for portrait/landscape
- Touch-friendly interactive elements

**Desktop (≥ 992px)**:
- Multi-column layouts
- Full feature set
- Hover states and tooltips
- Keyboard navigation

### Keyboard Navigation

All interactive elements keyboard accessible:
- Tab order logical
- Focus visible on all focusable elements
- Enter/Space activate buttons
- Escape closes modals/dropdowns
- Arrow keys navigate menus

## Search Engine Optimization

### Meta Information

- **Page Titles**: Unique, descriptive (50-60 chars)
- **Meta Descriptions**: Compelling summary (150-160 chars)
- **Canonical URLs**: Prevent duplicate content
- **Open Graph**: Social media previews optimized

### Structured Data

**Schema.org Markup**:
- Local Business schema for practice info
- Medical Business type (Doctor/Practice)
- Contact information
- Opening hours
- Address

### URL Structure

- **Format**: `/section/page` (e.g., `/team/members`)
- **Hyphens**: Use hyphens, not underscores
- **Lowercase**: All lowercase URLs
- **Trailing Slash**: Consistent across site

## Performance Rules

### Image Optimization

- **Formats**: WebP with JPEG fallback for photos
- **Sizing**: Appropriately sized for container
- **Lazy Loading**: Images below fold lazy-loaded
- **Compression**: Compressed without visible quality loss

### Asset Loading

- **Critical CSS**: Inline critical CSS
- **Deferred JS**: Non-critical JS deferred
- **Preloading**: Preload critical resources
- **Minification**: All assets minified in production

### Caching

- **Browser Cache**: Apache `.htaccess` Cache-Control headers enforce a three-tier strategy:
  - `index.html` → `no-cache` (always revalidate to pick up new hashed asset references)
  - Hashed JS/CSS → `max-age=31536000, immutable` (1 year; safe because filenames change per build)
  - JSON data (`news.json`) → `no-store` (never cached; dynamic admin content)
  - Images/fonts → `max-age=2592000, public` (30 days)
- **CDN Cache**: Static assets cached on CDN if applicable
- **Service Worker**: Future: offline support and caching strategy

## Error Handling Workflows

### 404 Not Found

- **User Experience**:
  - Friendly error message
  - Suggest navigation to home or main sections
  - Search functionality
  - Contact option

### 500 Server Error

- **User Experience**:
  - Apologetic message
  - "Try again" button
  - Report issue option
  - Alternative contact method

### Network/Connection Error

- **User Experience**:
  - "Check your connection" message
  - Offline indication (if offline)
  - Retry button
  - Fallback content if available

## Future Business Rules

### Appointment Booking (When Implemented)

- Calendar availability management
- Automated confirmations and reminders
- Cancellation policies
- No-show handling

### Newsletter Signup

- Email validation
- Double opt-in (confirmation email)
- Spam prevention (CAPTCHA)
- Unsubscribe links

### Patient Portal (Future)

- Secure login
- Appointment history
- Medical records access
- Prescription management
- Messaging with practice
