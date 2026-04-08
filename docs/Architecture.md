# Project Architecture

## Overall Structure

The Hausarzt Cottbus project follows a modern Angular architecture with:
- **Standalone Components**: All components use Angular's standalone API (no NgModule)
- **Feature-Based Organization**: Components organized by feature (pages, components, core)
- **Service-Based Logic**: Business logic isolated in services
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Directory Structure

```
src/
├── app/
│   ├── pages/                    # Page components (route handlers)
│   │   ├── home/                 # Home/landing page (dynamic news)
│   │   ├── about/                # About the practice
│   │   ├── team/                 # Team members page
│   │   ├── contact/              # Contact page
│   │   ├── performances/         # Services/specializations
│   │   ├── arrival/              # Location and directions
│   │   ├── privacy-policy/       # Privacy policy
│   │   ├── impressum/            # Legal information
│   │   ├── main/                 # Root container component
│   │   └── admin/                # Admin area
│   │       ├── admin-login/      # Login page
│   │       └── admin-dashboard/  # News management CRUD
│   │
│   ├── components/               # Reusable UI components
│   │   ├── header/               # Navigation header
│   │   ├── footer/               # Footer section
│   │   ├── hero/                 # Hero banner
│   │   ├── hero-card/            # Hero card component
│   │   ├── hero-card-pattern/    # Pattern hero cards
│   │   ├── images-carousel/      # Image carousel (Owl)
│   │   ├── latest-news/          # News section
│   │   ├── team-employees/       # Team grid/section
│   │   ├── team-employee/        # Individual team card
│   │   ├── contact-infos/        # Contact info display
│   │   ├── address-map/          # Google Map
│   │   └── scroll-to-top/        # Scroll-to-top button
│   │
│   ├── core/                     # Core utilities and services
│   │   ├── services/             # Application services
│   │   │   ├── news.service.ts
│   │   │   ├── scroll-tracker.service.ts
│   │   │   └── window.service.ts
│   │   │
│   │   ├── guards/               # Route guards
│   │   │   └── auth.guard.ts
│   │   │
│   │   ├── utils/                # Models, renderers, and auth
│   │   │   ├── news.model.ts     # NewsNotice, ContentBlock, template interfaces
│   │   │   ├── content-block.renderer.ts  # renderBlocks() — ContentBlock[] → safe HTML
│   │   │   ├── auth.utils.ts     # hashPassword() (SHA-256) + ADMIN_PASSWORD_HASH
│   │   │   └── models_interfaces.ts
│   │   │
│   │   └── animations-lib/       # Custom animation library
│   │       ├── attention-seekers/    # Attention animations
│   │       ├── bouncing-entrances/   # Bounce in animations
│   │       ├── bouncing-exits/       # Bounce out animations
│   │       ├── fading-entrances/     # Fade in animations
│   │       ├── fading-exits/         # Fade out animations
│   │       ├── flippers/             # Flip animations
│   │       ├── light-speed/          # Light speed animations
│   │       ├── rotating-entrances/   # Rotate in animations
│   │       ├── rotating-exits/       # Rotate out animations
│   │       ├── sliding-entrances/    # Slide in animations
│   │       ├── sliding-exits/        # Slide out animations
│   │       ├── zooming-entrances/    # Zoom in animations
│   │       ├── specials/             # Special animations
│   │       └── common/               # Animation utilities
│   │
│   ├── app.component.ts          # Root component
│   ├── app.component.html
│   └── app.component.scss
│
├── assets/                       # Static resources
│   ├── images/                   # Image files
│   └── js/                       # Third-party JS libraries
│       ├── jquery.min.js
│       ├── bootstrap.bundle.min.js
│       ├── owl.carousel.min.js
│       └── scrollspy.min.js
│
├── environments/                 # Environment configs
│   ├── environment.ts           # Production environment
│   └── environment.development.ts
│
├── styles.scss                  # Global styles
├── index.html                   # HTML entry point
└── main.ts                      # Bootstrap entry point

public/                          # Static files served as-is
├── api/
│   └── save-news.php           # PHP endpoint for news persistence
├── data/
│   └── news.json               # Dynamic news data (JSON)
└── favicon.ico
dist/                           # Build output (generated)
```

## Routing Architecture

The application uses Angular Router with standalone components and lazy loading via `loadComponent()`.

**Public Routes** (configured in `app.routes.ts`):
```
/                    → redirects to /home
/home               → HomeComponent
/our_praxis         → AboutComponent
/team               → TeamComponent
/leistungen         → PerformancesComponent
/contact            → ContactComponent
/arrival            → ArrivalComponent
/impressum          → ImpressumComponent
/privacy_policy     → PrivacyPolicyComponent
/**                 → redirects to /home
```

**Admin Routes** (nested under `/admin`):
```
/admin              → redirects to /admin/login
/admin/login        → AdminLoginComponent
/admin/dashboard    → AdminDashboardComponent (protected by authGuard)
```

**Component Hierarchy**:
```
AppComponent (root)
└── MainComponent (root container)
    ├── [Public Page Component] (routed)
    │   ├── HeaderComponent
    │   └── FooterComponent
    └── [Admin Page Component] (routed, standalone layout)
        ├── AdminLoginComponent
        └── AdminDashboardComponent
```

## Route Guards

### authGuard
**File**: `src/app/core/guards/auth.guard.ts`
**Type**: Functional `CanActivateFn`

Checks `localStorage` for `admin_token` (SHA-256 hash). If missing or not matching `ADMIN_PASSWORD_HASH`, redirects to `/admin/login`.

## Dependency Injection

Services are provided at the root level using `providedIn: 'root'`:
- **NewsService**: Loads news from JSON, manages in-memory state via BehaviorSubject, persists via PHP endpoint
- **ScrollTrackerService**: Tracks scroll position for active section highlighting
- **WindowService**: Handles window resize events and breakpoint detection

Services are injected using Angular's `inject()` function.

## Component Communication

### Parent to Child
- Input properties (`@Input()`)
- Template binding

### Child to Parent
- Output properties (`@Output()`)
- EventEmitter

### Across Components
- Service-based communication using RxJS Subjects

## Styling Architecture

### Global Styles (`styles.scss`)
- CSS variables for theme colors
- Utility classes
- Global resets and base styles

### Component Styles
- Scoped SCSS per component
- BEM naming convention for classes
- Responsive utilities

### External Libraries
- **ng-zorro-antd**: Ant Design CSS
- **Bootstrap**: Grid system and utilities
- **Custom SCSS**: Component-specific styles

## Third-Party Integration

### UI Libraries
- **ng-zorro-antd**: Enterprise UI components
- **Bootstrap 5**: Grid, utilities, components
- **jQuery**: DOM manipulation (legacy)
- **Owl Carousel**: Image carousels

### Maps
- **Google Maps**: Address map integration via `@angular/google-maps`

### Development Tools
- **Angular CLI**: Build and development
- **Custom Webpack**: Extended build configuration
- **Copy Webpack Plugin**: Asset copying during build

## Performance Considerations

### Code Splitting
- Standalone components enable better tree-shaking
- Lazy loading possible for future route modules
- Production builds use output hashing

### Asset Optimization
- Images optimized before deployment
- JS libraries minified
- CSS bundled and optimized
- HTML minified in production

### Build Configuration
- Production budgets: 4MB initial, 8MB total
- Per-component style budget: 1MB warning, 2MB error
- Output hashing for cache-busting

## State Management

Current state management approach:
- **Component State**: Local component properties
- **Service State**: Shared state via services with RxJS BehaviorSubjects
- **NewsService**: Central news state in `BehaviorSubject<NewsNotice[]>`, with localStorage backup
- **No Redux/NgRx**: Simpler approach suitable for this application

## Error Handling

Error handling patterns:
- Try-catch in service methods
- Error handling in component ngOnInit
- Graceful fallbacks for failed operations

## Security Considerations

### Admin Authentication
- Password hashed with SHA-256 (`crypto.subtle`) before comparison and storage
- Only the hash is stored in `localStorage` as `admin_token` — plaintext password never persisted
- `ADMIN_PASSWORD_HASH` constant and `hashPassword()` utility in `core/utils/auth.utils.ts`
- `authGuard` checks stored hash against `ADMIN_PASSWORD_HASH` before allowing access to `/admin/dashboard`
- Logout clears token and redirects to login

### API Security
- PHP save endpoint validates `X-API-Key` header against server-side secret
- CORS restricted to `https://www.hausarzt-cottbus.de`
- Only POST method accepted; OPTIONS handled for preflight
- HTTPS enforced in production

### XSS Handling
- `LatestNewsComponent` uses `DomSanitizer.sanitize(SecurityContext.HTML, ...)` — no `bypassSecurityTrustHtml`
- `renderBlocks()` HTML-escapes all user text before any processing; only whitelisted tags (`p`, `strong`, `b`, `ul`, `li`, `hr`) and CSS classes appear in output
- All other dynamic content uses Angular's built-in sanitization

## Build & Deployment Pipeline

### Development Build
```bash
ng serve
# Hot module reloading, source maps enabled
```

### Production Build
```bash
ng build
# or custom base-href for subfolder deployment
ng build --base-href /hausarzt-cottbus/
```

### Asset Handling
- `.htaccess` file copied to dist via `copy-htaccess.js` post-build script
- `.htaccess` includes `Cache-Control` headers: `no-cache` for `index.html`, `max-age=31536000, immutable` for hashed JS/CSS, `no-store` for JSON data, `max-age=2592000` for images/fonts
- Static assets from `public/` and `src/assets/` included

## Environment Configuration

Two environment files:
- **production**: Optimized, minified, no debug output
- **development**: Source maps, debug logging enabled

Environment variables accessed via:
```typescript
import { environment } from '../environments/environment';
environment.production // boolean
```
