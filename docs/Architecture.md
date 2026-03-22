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
│   │   ├── home/                 # Home/landing page
│   │   ├── about/                # About the practice
│   │   ├── team/                 # Team members page
│   │   ├── contact/              # Contact page
│   │   ├── performances/         # Services/specializations
│   │   ├── arrival/              # Location and directions
│   │   ├── privacy-policy/       # Privacy policy
│   │   ├── impressum/            # Legal information
│   │   └── main/                 # Root container component
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
│   │   │   ├── scroll-tracker.service.ts
│   │   │   └── window.service.ts
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
dist/                           # Build output (generated)
```

## Routing Architecture

The application uses Angular Router with standalone components:

**Root Routes** (configured in main component):
```
/                    → home
/about              → about
/team               → team
/contact            → contact
/performances       → performances
/arrival            → arrival
/privacy-policy     → privacy-policy
/impressum          → impressum
```

**Component Hierarchy**:
```
AppComponent (root)
└── MainComponent (root container)
    └── [Page Component] (routed)
        ├── HeaderComponent
        └── FooterComponent
```

## Dependency Injection

Services are provided at the root level using `providedIn: 'root'`:
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
- **Component State**: Local component state using `@State()` or properties
- **Service State**: Shared state via services with RxJS Observables
- **No Redux/NgRx**: Simpler approach suitable for this application

## Error Handling

Error handling patterns:
- Try-catch in service methods
- Error handling in component ngOnInit
- Graceful fallbacks for failed operations

## Security Considerations

### CORS & API Security
- API calls include proper headers
- HTTPS enforced in production

### XSS Prevention
- Angular built-in sanitization for dynamic content
- No usage of `bypassSecurityTrustHtml` without validation

### CSRF Protection
- Built-in CSRF token handling if applicable

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
- `.htaccess` file copied to dist via custom webpack plugin
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
