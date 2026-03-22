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

Key Logic:
- Injects `NewsService`
- On init, calls `newsService.loadNotices()` then sets `newsList` from `getActiveNotice()?.content`
- Only displays the notice whose date range includes today and is marked active

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
- Create new notice form with title, date range, active toggle, and multi-line content editor
- Edit existing notices
- Delete notices with confirmation dialog
- Toggle activate/deactivate per notice
- Live preview using `LatestNewsComponent`
- Auto-persists changes to server via `NewsService.saveNotices()`
- Save status indicators (saving/saved/error)
- Logout button clears token and redirects

Imports: `CommonModule`, `FormsModule`, `LatestNewsComponent`

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

Purpose: Display news notices with rich HTML content.

Input Properties:
- `textsList`: `Array<string>` — array of HTML strings to render

Features:
- Sanitizes each string via `DomSanitizer.bypassSecurityTrustHtml()`
- Renders items with `[innerHTML]` binding
- Shows "Keine Aktuelles!" when empty
- Header "Aktuelles!" displayed above content
- Styled card with blue border

Used by:
- `HomeComponent` (public-facing news display)
- `AdminDashboardComponent` (live preview during editing)

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
- `loadNotices()`: GET request to `/data/news.json` (cache-busted with timestamp), updates BehaviorSubject and localStorage
- `getNotices()`: Returns `Observable<NewsNotice[]>` from BehaviorSubject
- `getActiveNotice()`: Synchronously finds the first notice where `isActive === true` and today falls within `startDate`–`endDate`
- `saveNotices(notices)`: Updates local state + localStorage, then POSTs to `/api/save-news.php` with `X-API-Key` header
- `addNotice(notice)`: Adds to in-memory array
- `updateNotice(updated)`: Replaces matching notice by `id`
- `deleteNotice(id)`: Removes notice by `id`

State: `BehaviorSubject<NewsNotice[]>` with localStorage backup key `hausarzt_news`

Usage: Injected by `HomeComponent` and `AdminDashboardComponent`

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
