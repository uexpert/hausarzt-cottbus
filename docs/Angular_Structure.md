# Angular Structure & Components

## Standalone Components

All components in this project use Angular's standalone API (introduced in Angular 14, now standard in Angular 19). This means:

- No `NgModule` declarations needed
- Components can be imported directly in other components
- Easier to understand dependencies
- Better tree-shaking and code splitting

### Standalone Component Pattern

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  imports: [CommonModule, FormsModule], // Explicit imports
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss'
})
export class ComponentNameComponent {
  // Component logic
}
```

## Page Components

Page components are route handlers that display when users navigate to a specific URL.

### MainComponent (Root Container)
**File**: `src/app/pages/main/main.component.ts`

Purpose: Root container that includes header and footer for all pages.

```typescript
// Contains:
// - RouterOutlet (for page content)
// - HeaderComponent
// - FooterComponent
```

### HomeComponent
**File**: `src/app/pages/home/home.component.ts`

Purpose: Landing/home page with practice overview and dynamic news.

Sections:
- Hero banner with practice name/tagline
- Latest news section (dynamically loaded from `news.json` via `NewsService`)
- Yellow `Vorschaumodus` banner when accessed via `?preview=<id>`

Key Logic:
- Injects `NewsService` and `ActivatedRoute`
- On init, calls `newsService.loadNotices()`; subscribes to `route.queryParamMap` so the displayed notices are re-resolved whenever the URL changes
- `applyPreviewOrActive()` decides what to show:
  - If `?preview=<id>` is present: `previewMode = true` and `activeNotices = [getNoticeById(id)]` — the referenced notice is rendered regardless of `isActive` or date range. `previewMissing = true` when the ID is unknown, surfacing a red `alert-danger` block.
  - Otherwise: standard `getActiveNotices()` result drives `activeNotices`.
- The "Aktuelles!" heading appears once as a section heading above all notice cards
- Entire section is hidden with `@if (activeNotices.length > 0)` when no notices are active
- Each notice rendered by its own `<latest-news>` instance with `[blocks]`, `[title]`, `[startDate]`, `[endDate]`

Component fields: `activeNotices: NewsNotice[]`, `previewMode: boolean`, `previewMissing: boolean`

### AboutComponent
**File**: `src/app/pages/about/about.component.ts`

Purpose: Information about the practice and team introduction.

Displays:
- Practice history and mission
- Brief team introduction
- Practice values/approach

### TeamComponent
**File**: `src/app/pages/team/team.component.ts`

Purpose: Detailed team member profiles.

Features:
- List of all team members with photos
- Individual member cards with titles and specialties
- Contact information for team members

Uses: `TeamEmployeesComponent` and `TeamEmployeeComponent`

### ContactComponent
**File**: `src/app/pages/contact/contact.component.ts`

Purpose: Contact form and inquiries.

Features:
- Contact form with validation
- Contact information display
- Response message handling

### PerformancesComponent
**File**: `src/app/pages/performances/performances.component.ts`

Purpose: Display medical services and specializations offered.

Displays:
- List of medical services
- Specializations/expertise areas
- Service descriptions and icons

### ArrivalComponent
**File**: `src/app/pages/arrival/arrival.component.ts`

Purpose: Location information and directions.

Features:
- Google Map with practice location
- Address and directions
- Parking information
- Opening hours

Uses: `AddressMapComponent`

### PrivacyPolicyComponent
**File**: `src/app/pages/privacy-policy/privacy-policy.component.ts`

Purpose: GDPR compliance and privacy information.

Content:
- Data processing policies
- Cookie information
- User rights
- Compliance statements

### ImpressumComponent
**File**: `src/app/pages/impressum/impressum.component.ts`

Purpose: Legal information (required by German law).

Content:
- Practice details and contact
- Owner/responsible person
- Disclaimer
- Legal notices

### AdminLoginComponent
**File**: `src/app/pages/admin/admin-login/admin-login.component.ts`

Purpose: Password-based admin authentication.

Features:
- Password input field with enter-key submission
- Validates password against hardcoded value
- On success: stores token in localStorage, navigates to `/admin/dashboard`
- On failure: shows error message, clears input
- Styled with Bootstrap card layout

### AdminDashboardComponent
**File**: `src/app/pages/admin/admin-dashboard/admin-dashboard.component.ts`

Purpose: Full CRUD interface for managing news notices.

Features:
- Lists all notices with status badges (active/inactive/outside date range)
- Create/edit form with title, date range, active toggle, and block-builder content editor
- Block-builder: each content row has a **type selector** + **plain text textarea** — no HTML entry permitted
- Block types: `paragraph`, `heading` (blue/bold), `bold`, `list-item`, `emergency` (red), `separator` (horizontal rule), `spacer` (empty line)
- Per-block formatting controls: alignment (left/center/right), indent direction + depth (1–10 em), line-height (preset steps + custom 0.5–4.0 in 0.05 increments)
- Separator and spacer blocks hide text input and formatting controls in the UI
- Inline bold via `**text**` syntax; `{startDate}` / `{endDate}` parameters replaced at render time
- Drag-and-drop block reordering (HTML5 native DnD) + up/down buttons
- Reusable text templates (single-block via ⭐, or all-blocks via "⭐ Alle als Vorlage"); stored in localStorage `hac_text_templates`
- Title templates with `{startDate}`/`{endDate}` placeholders; stored in localStorage `hac_title_templates`; applied with German-locale date substitution
- Delete notices via `DialogService.confirm()` (async, application-specific dialog — no browser `confirm()`)
- Save-as-template via `DialogService.prompt()` (async — no browser `prompt()`)
- In-form live preview using `LatestNewsComponent` with "Aktuelles!" heading above the card (quick visual check during editing)
- **"👁 Auf Website ansehen" link per saved notice** — uses Angular `RouterLink` (`['/home']` with `[queryParams]="{preview: notice.id}"` and `target="_blank"`), opens the public homepage in a new tab with full-page preview rendering of that notice. Imported via `RouterLink` in the component's standalone imports.
- **`emptyNotice()` defaults `isActive` to `false`** — every newly created notice is off until the admin explicitly activates it. Editing an existing notice (`openEditForm()`) preserves the current `isActive` state. A hint under the active-toggle suggests the recommended workflow (save deactivated → preview → activate).
- Auto-persists changes to server via `NewsService.saveNotices()`
- Save status indicators (saving/saved/error) + inline form validation alert (`formError`)
- Logout button clears token and redirects

State ownership & persistence flow:
- Component owns `notices: NewsNotice[]` as local source of truth for the list rendered in the UI
- Each CRUD action (`saveNotice`, `deleteNotice`, `toggleActive`) mutates via `NewsService` (`addNotice`/`updateNotice`/`deleteNotice` keep the service's `BehaviorSubject` in sync for the home page) then refreshes `this.notices` via `newsService.getNoticesSnapshot()`
- `persistToServer()` is a fire-and-forget helper: reads the current snapshot, POSTs via `saveNotices()`, and drives the global `saveStatus` banner
- This pattern avoids subscribing to `notices$` from inside a save callback, eliminating the re-entrancy and subscription leaks that existed in earlier versions
- Validation errors (empty title / no content blocks) set `formError` and surface a Bootstrap `alert-warning`; separator/spacer blocks are preserved by the content filter regardless of text

Key properties: `notices: NewsNotice[]`, `formError: string | null`, `saveStatus`, `isFormSaving`, `pendingNoticeId`, `blockTypes[]`, `lineHeightOptions[]`, `templates: TextTemplate[]`, `titleTemplates: TitleTemplate[]`, `previewBlocks`, `previewTitle`, `previewStartDate`, `previewEndDate`, `dragSrcIndex`, `dragOverIndex`

Imports: `CommonModule`, `FormsModule`, `RouterLink`, `LatestNewsComponent`; injects `NewsService`, `Router`, `DialogService`

## Shared Components

Reusable components used across multiple pages.

### HeaderComponent
**File**: `src/app/components/header/header.component.ts`

Purpose: Navigation bar and branding.

Features:
- Navigation links to all pages
- Practice logo/name
- Mobile responsive hamburger menu
- Active route highlighting (via ScrollTrackerService)

### FooterComponent
**File**: `src/app/components/footer/footer.component.ts`

Purpose: Footer section on all pages.

Displays:
- Footer navigation links
- Contact information
- Social media links
- Copyright information

### HeroComponent
**File**: `src/app/components/hero/hero.component.ts`

Purpose: Large hero/banner section.

Features:
- Background image or color
- Main headline and tagline
- Call-to-action buttons
- Optional parallax effect

### HeroCardComponent
**File**: `src/app/components/hero-card/hero-card.component.ts`

Purpose: Card component with hero styling.

Input Properties:
- `title`: Card title
- `description`: Card description
- `icon`: Icon/image for the card
- `link`: Optional link/button action

### HeroCardPatternComponent
**File**: `src/app/components/hero-card-pattern/hero-card-pattern.component.ts`

Purpose: Pattern variant of hero cards (multiple cards in grid).

Features:
- Grid layout of hero cards
- Responsive columns
- Consistent styling
- Hover effects with animations

Input Properties:
- `cards`: Array of card data
- `columns`: Number of columns (responsive)

### ImagesCarouselComponent
**File**: `src/app/components/images-carousel/images-carousel.component.ts`

Purpose: Image carousel/slideshow using Owl Carousel.

Features:
- Multiple images with navigation
- Auto-play capability
- Touch/swipe support
- Responsive item display

Input Properties:
- `images`: Array of image URLs
- `autoplay`: Boolean for auto-play
- `loop`: Boolean for continuous loop

Uses: Owl Carousel jQuery library

### LatestNewsComponent
**File**: `src/app/components/latest-news/latest-news.component.ts`

Purpose: Display a single news notice as styled HTML, enforcing project typography.

Input Properties:
- `blocks: ContentBlock[]` — typed plain-text blocks from `NewsNotice.content`
- `title: string` — announcement sub-title shown inside the card (below the section-level "Aktuelles!" heading); may contain `{startDate}`/`{endDate}` placeholders
- `startDate?: string` — ISO date string (YYYY-MM-DD) used for date substitution
- `endDate?: string` — ISO date string (YYYY-MM-DD) used for date substitution

Rendering pipeline (`ngOnChanges`):
1. Two date formats are computed from `startDate`/`endDate`:
   - **Short** (`dd.MM.yyyy`): used as `RenderContext` for `{startDate}`/`{endDate}` in block text
   - **Long** (`dd. MonthName yyyy`, German locale): used to substitute `{startDate}`/`{endDate}` in the `title`
2. `renderedTitle` computed by replacing placeholders in `title` with the long-format dates
3. `renderBlocks(blocks, ctx)` called — produces HTML; all user text HTML-escaped; `**bold**` → `<strong>`; CSS class names only (no `style=""`)
4. Result passed through `DomSanitizer.sanitize(SecurityContext.HTML, ...)` — `bypassSecurityTrustHtml` is **not** used
5. `renderedHtml` bound to `[innerHTML]`; `renderedTitle` bound to `{{ renderedTitle }}`

Features:
- Styled card with blue border
- Title hidden when empty (`@if (title)`)

Used by:
- `HomeComponent` (public-facing news display — "Aktuelles!" heading in parent, title/blocks from notice)
- `AdminDashboardComponent` (live preview — "Aktuelles!" heading above card in admin template)

### TeamEmployeesComponent
**File**: `src/app/components/employees-section/team-employees.component.ts`

Purpose: Section displaying multiple team members in grid.

Features:
- Grid layout of team members
- Responsive columns
- Filter by specialty (optional)
- Sort capabilities

Uses: `TeamEmployeeComponent`

### TeamEmployeeComponent
**File**: `src/app/components/team-employee/team-employee.component.ts`

Purpose: Individual team member card.

Input Properties:
- `employee`: Employee data object
  - `name`: Team member name
  - `title`: Position/specialty
  - `photo`: Photo URL
  - `bio`: Short biography
  - `contact`: Contact information

### ContactInfosComponent
**File**: `src/app/components/contact-infos/contact-infos.component.ts`

Purpose: Display contact information.

Displays:
- Phone numbers
- Email addresses
- Physical address
- Opening hours
- Social media links

### AddressMapComponent
**File**: `src/app/components/address-map/address-map.component.ts`

Purpose: Google Map showing practice location.

Features:
- Interactive map
- Location marker
- Address display
- Zoom controls
- Mobile responsive

Uses: `@angular/google-maps`

### ScrollToTopComponent
**File**: `src/app/components/scroll-to-top/scroll-to-top.component.ts`

Purpose: Floating button to scroll to page top.

Features:
- Appears after scrolling down
- Smooth scroll animation
- Fixed positioning
- Accessible and keyboard friendly

## Core Services

Services for application logic and utilities.

### NewsService
**File**: `src/app/core/services/news.service.ts`

Purpose: Central service for loading, caching, and persisting news notices.

Key Methods:
- `loadNotices()`: GET request to `data/news.json` resolved via `Location.prepareExternalUrl()` (cache-busted with timestamp), updates BehaviorSubject and localStorage
- `getNotices()`: Returns `Observable<NewsNotice[]>` from BehaviorSubject
- `getNoticesSnapshot()`: Synchronous helper returning the current `notices$.getValue()` — used by `AdminDashboardComponent` to read the list without subscribing
- `getNoticeById(id)`: Synchronous lookup that returns the notice with the matching ID regardless of `isActive` or date range, or `null` if not found. Used by `HomeComponent` to render full-page previews requested via `?preview=<id>`.
- `getActiveNotices()`: Synchronously returns **all** notices where `isActive === true` and today has not passed `endDate` (inclusive). Notices are visible before their start date so patients get advance notice of closures.
- `getActiveNotice()`: Returns the first result of `getActiveNotices()` or `null` (backwards-compatibility alias)
- `saveNotices(notices)`: Updates local state + localStorage, then POSTs to `api/save-news.php` (resolved via `Location.prepareExternalUrl()`) with `X-API-Key` header
- `addNotice(notice)`: Adds to in-memory array
- `updateNotice(updated)`: Replaces matching notice by `id`
- `deleteNotice(id)`: Removes notice by `id`

Base-href awareness: both URLs go through `Location.prepareExternalUrl()` so requests pick up whatever `<base href>` `index.html` was built with — `/data/news.json` for root deploys, `/hausarzt-cottbus/data/news.json` for sub-folder deploys (`npm run build:usama-dev`). No per-environment configuration needed.

State: `BehaviorSubject<NewsNotice[]>` with localStorage backup key `hausarzt_news`

Usage: Injected by `HomeComponent` and `AdminDashboardComponent`

### DialogService
**File**: `src/app/core/services/dialog.service.ts`

Purpose: Application-wide replacement for browser `prompt()` and `confirm()` dialogs.

Key Methods:
- `prompt(title, placeholder?)`: Opens a text-input dialog; returns `Promise<string | null>` (null = cancelled)
- `confirm(title, message)`: Opens a yes/no dialog; returns `Promise<boolean>` (false = cancelled)
- `_resolve(value)`: Called internally by `DialogComponent` to close the dialog and resolve the Promise

State: `BehaviorSubject<DialogState | null>` — `DialogComponent` subscribes to this to show/hide the overlay.

Usage: Inject in any component and use `await this.dialogService.prompt(...)` / `await this.dialogService.confirm(...)`. The dialog host `<app-dialog>` must be present in `AppComponent` (it is).

### DialogComponent
**File**: `src/app/core/components/dialog/dialog.component.ts`

Purpose: Global dialog overlay host, mounted once in `AppComponent`.

Features:
- Subscribes to `DialogService.state$`
- Renders prompt (text input + Enter/Escape keybindings) or confirm (message + action buttons) variants
- Backdrop click cancels the dialog
- Confirm button disabled when prompt input is empty
- Styles in global `styles.scss` (`.dialog-backdrop`, `.dialog-box`, `dlg-fade-in`/`dlg-slide-in` keyframes)

### ScrollTrackerService
**File**: `src/app/core/services/scroll-tracker.service.ts`

Purpose: Track scroll position and emit scroll events.

Key Methods:
- `getScrollPosition()`: Get current scroll position
- `trackScroll()`: Start tracking scroll position
- `scrollToSection(id)`: Scroll to element by ID
- `getActiveSection()`: Get current section being viewed

Usage: Used by HeaderComponent for active navigation highlighting

### WindowService
**File**: `src/app/core/services/window.service.ts`

Purpose: Handle window resize events and breakpoint detection.

Key Methods:
- `getWindowSize()`: Get current window dimensions
- `onResize()`: Observable for resize events
- `checkBreakpoints(size)`: Determine active breakpoint
- `getBreakpoint()`: Get current breakpoint (xs, sm, md, lg, xl)

Breakpoints:
- xs: < 576px
- sm: 576px - 767px
- md: 768px - 991px
- lg: 992px - 1199px
- xl: ≥ 1200px

Usage: Used by AppComponent and components needing responsive behavior

## Animations Library

Custom animation library with 60+ pre-built animations.

**Location**: `src/app/core/animations-lib/`

### Animation Categories

#### Attention Seekers
Animations that draw attention to an element.
- `bounceAnimation`, `flashAnimation`, `headShakeAnimation`, `heartBeatAnimation`
- `jelloAnimation`, `pulseAnimation`, `rubberBandAnimation`, `shakeAnimation`
- `swingAnimation`, `tadaAnimation`, `wobbleAnimation`

#### Entrance Animations
- **Bounce**: `bounceInAnimation`, `bounceInDownAnimation`, `bounceInLeftAnimation`, etc.
- **Fade**: `fadeInAnimation`, `fadeInDownAnimation`, `fadeInLeftAnimation`, etc.
- **Flip**: `flipInXAnimation`, `flipInYAnimation`
- **Rotate**: `rotateInAnimation`, `rotateInDownLeftAnimation`, etc.
- **Slide**: `slideInAnimation`, `slideInDownAnimation`, `slideInLeftAnimation`, etc.
- **Zoom**: `zoomInAnimation`, `zoomInDownAnimation`, `zoomInLeftAnimation`, etc.

#### Exit Animations
Similar to entrance animations but with reverse effect:
- `bounceOutAnimation`, `fadeOutAnimation`, `flipOutAnimation`, `rotateOutAnimation`, `slideOutAnimation`, `zoomOutAnimation`

#### Special Animations
- `hingeAnimation`, `jackInTheBoxAnimation`, `rollInAnimation`, `rollOutAnimation`
- `lightSpeedInAnimation`, `lightSpeedOutAnimation`
- `collapseAnimation`, `hueRotateAnimation`, `rotateAnimation`

### Using Animations in Components

```typescript
import { bounceAnimation } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<div [@bounce]="isAnimating"></div>',
  animations: [bounceAnimation]
})
export class ExampleComponent {
  isAnimating = true;
}
```

### Animation Utilities

**Common Functions** (`common/` folder):
- Animation interface definitions
- Helper functions for creating animation sequences
- Utilities for including child animations

## Component Data Flow

### Data Passing

**Parent to Child**:
```typescript
// Parent component
<app-hero-card [title]="'My Title'" [description]="'Description'"></app-hero-card>

// Child component
@Input() title: string;
@Input() description: string;
```

**Child to Parent**:
```typescript
// Child component
@Output() buttonClick = new EventEmitter<void>();
onButtonClick() {
  this.buttonClick.emit();
}

// Parent component
<app-hero-card (buttonClick)="onParentClick()"></app-hero-card>
```

### Observable Patterns

Services use RxJS for reactive data:

```typescript
// Service
private scrollPosition$ = new BehaviorSubject(0);
getScrollPosition() {
  return this.scrollPosition$.asObservable();
}

// Component
this.scrollTracker.getScrollPosition().subscribe(position => {
  // Handle scroll position
});
```

## Change Detection

Angular OnPush change detection strategy used where applicable for better performance:

```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {}
```

## Lifecycle Hooks

Components use Angular lifecycle hooks:
- `OnInit`: Initialize data
- `OnDestroy`: Cleanup subscriptions
- `AfterViewInit`: Access child components after view initialization
- `OnChanges`: Detect input property changes
