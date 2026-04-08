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
  - Today's date falls within `startDate` (inclusive) to `endDate` (inclusive, end of day)
- If no notices match, the "Aktuelles" section is hidden entirely (`@if (activeNotices.length > 0)`)

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
- **Create**: New notice with title, start/end dates, active flag, and block-builder content
- **Read**: Lists all notices with status badges
- **Update**: Edit any field of an existing notice
- **Delete**: Confirmation via `DialogService.confirm()` (no browser `confirm()`)

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
- "Aktiv & Sichtbar" (green): `isActive === true` AND today is within date range
- "Aktiviert (außerhalb Zeitraum)" (yellow): `isActive === true` BUT today is outside date range
- "Deaktiviert" (grey): `isActive === false`

**Persistence Workflow**:
1. In-memory state updated via `NewsService` methods
2. `saveNotices()` sends POST to `/api/save-news.php` with `X-API-Key` header
3. PHP endpoint writes JSON to `public/data/news.json`
4. Save status shown to admin: saving → saved / error

**Live Preview**: Admin can preview a notice using the same `LatestNewsComponent` used on the public site; preview section includes "Aktuelles!" heading above the card

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

- **Endpoint**: `/api/save-news.php` accepts POST only
- **Authentication**: `X-API-Key` header validated against server-side secret
- **CORS**: Restricted to `https://www.hausarzt-cottbus.de`
- **Input Validation**: JSON body decoded and validated as array before writing

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
