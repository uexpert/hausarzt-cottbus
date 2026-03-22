# Hausarzt Cottbus - Frontend Structure Analysis

**Status**: READ-ONLY ANALYSIS (No modifications made)

---

## 1. Folder Structure under src/app

```
src/app/
├── pages/                          # Page/Route Components (9 pages)
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   ├── home.component.scss
│   │   └── home.component.spec.ts
│   ├── about/
│   ├── team/
│   ├── contact/
│   ├── performances/
│   ├── arrival/
│   ├── impressum/
│   ├── privacy-policy/
│   └── main/                       # Root container component
│
├── components/                     # Reusable UI Components (12 components)
│   ├── header/
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   ├── header.component.scss
│   │   └── header.component.spec.ts
│   ├── footer/
│   ├── hero/
│   ├── hero-card/
│   ├── hero-card-pattern/
│   ├── images-carousel/
│   ├── latest-news/
│   ├── team-employees/            # (Also named: employees-section)
│   ├── team-employee/
│   ├── contact-infos/
│   ├── address-map/
│   └── scroll-to-top/
│
├── core/                           # Core Utilities & Services
│   ├── services/                   # Application Services (2 services)
│   │   ├── scroll-tracker.service.ts
│   │   ├── scroll-tracker.service.spec.ts
│   │   ├── window.service.ts
│   │   └── window.service.spec.ts
│   │
│   ├── animations-lib/             # Custom Animation Library (60+ animations)
│   │   ├── attention-seekers/      # 11 animations
│   │   │   ├── bounce.animation.ts
│   │   │   ├── flash.animation.ts
│   │   │   ├── head-shake.animation.ts
│   │   │   ├── heart-beat.animation.ts
│   │   │   ├── jello.animation.ts
│   │   │   ├── pulse.animation.ts
│   │   │   ├── rubber-band.animation.ts
│   │   │   ├── shake.animation.ts
│   │   │   ├── swing.animation.ts
│   │   │   ├── tada.animation.ts
│   │   │   ├── wobble.animation.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── bouncing-entrances/     # 5 animations
│   │   ├── bouncing-exits/         # 5 animations
│   │   ├── fading-entrances/       # 9 animations
│   │   ├── fading-exits/           # 9 animations
│   │   ├── flippers/               # 5 animations
│   │   ├── light-speed/            # 2 animations
│   │   ├── rotating-entrances/     # 5 animations
│   │   ├── rotating-exits/         # 5 animations
│   │   ├── sliding-entrances/      # 4 animations
│   │   ├── sliding-exits/          # 4 animations
│   │   ├── zooming-entrances/      # 5 animations
│   │   ├── zooming-exits/          # (Not listed separately)
│   │   ├── specials/               # 4 animations
│   │   ├── expert-animations/      # (Supplementary animations)
│   │   ├── other/                  # 4 animations (collapse, hue-rotate, rotate, animate-children)
│   │   └── common/                 # Animation utilities and interfaces
│   │
│   ├── directives/                 # Custom Directives (1 directive)
│   │   └── hyphenate.directive.ts
│   │
│   ├── svg-icons/                  # SVG Icon Components (20+ icon components)
│   │   ├── components/
│   │   │   ├── adc-logo-icon.component.ts
│   │   │   ├── appointment-icon.component.ts
│   │   │   ├── author-icon.component.ts
│   │   │   ├── bytlock-logo-icon/
│   │   │   ├── close-x-icon.component.ts
│   │   │   ├── company-icon.component.ts
│   │   │   ├── container-icon.component.ts
│   │   │   ├── empty-circle-icon.component.ts
│   │   │   ├── exit-icon.component.ts
│   │   │   ├── fill-check-circle-icon.component.ts
│   │   │   ├── hause-icon.component.ts
│   │   │   ├── loader-icon.component.ts
│   │   │   ├── meet-video-cam-icon.component.ts
│   │   │   ├── recycle-bin-icon.component.ts
│   │   │   ├── skin-cancer-icon/
│   │   │   ├── smile-chat.component.ts
│   │   │   ├── spinner-adc-logo-icon.component.ts
│   │   │   ├── up-arrow-circle-icon.component.ts
│   │   │   ├── up-down-toggle-icon.component.ts
│   │   │   ├── vacation-icon.component.ts
│   │   │   └── icons-source/       # (Icon source files)
│   │   └── svg-icons.module.ts
│   │
│   ├── utils/                      # Utilities & Models
│   │   └── models_interfaces.ts    # Data models and constants
│   │
│   ├── ng-zorro-antd/              # ng-zorro-antd Configuration
│   │   └── ng-zorro-antd.module.ts
│   │
│   └── (No shared folder - components are in components/ directory)
│
├── app.component.ts                # Root Component
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.routes.ts                   # Routing Configuration
├── app.config.ts                   # Application Configuration
└── (No app.module.ts - Standalone components, no NgModule)

src/
├── styles.scss                     # Global Styles
├── index.html                      # HTML Entry Point
└── main.ts                         # Bootstrap Entry Point
```

---

## 2. Angular Modules & Connections

### Architecture: Standalone Components (No NgModules)

**All components are standalone** - no traditional NgModule architecture.

### Root Configuration

**File**: `app.config.ts`

Configured Providers:
- `provideZoneChangeDetection` - Zone.js change detection optimization
- `provideRouter(routes, withInMemoryScrolling)` - Routing with scroll restoration
- `importProvidersFrom(BrowserAnimationsModule)` - Angular animations
- `provideNzI18n(de_DE)` - ng-zorro-antd German localization
- `importProvidersFrom(FormsModule)` - Angular forms
- `provideAnimationsAsync()` - Async animations
- `provideHttpClient()` - HTTP client (provided but not actively used for API)
- `importProvidersFrom(NzIconModule.forRoot(icons))` - ng-zorro icon system (16 icons registered)
- `provideValue('windowObject', window)` - Window object injection

### Component Imports

Components manually import what they need:

```typescript
// Example imports in standalone components
imports: [
  CommonModule,
  FormsModule,
  RouterModule,
  // Custom components
  HeaderComponent,
  FooterComponent,
  // ng-zorro components as needed
]
```

### Dependency Injection Pattern

Services provided at root level:
```typescript
@Injectable({ providedIn: 'root' })
export class ServiceName { }
```

Injected via:
```typescript
export class ComponentName {
  private service = inject(ServiceName);
}
```

---

## 3. Key Services Used

### Only 2 Core Services (No API Services)

#### 1. **ScrollTrackerService**
- **Location**: `src/app/core/services/scroll-tracker.service.ts`
- **Purpose**: Track active section during scroll
- **Key Features**:
  - BehaviorSubject: `activeSection$` (Observable)
  - Method: `setActiveSection(sectionId: string)`
- **Usage**: Used by HeaderComponent for active navigation highlighting
- **No API calls** - purely client-side state management

#### 2. **WindowService**
- **Location**: `src/app/core/services/window.service.ts`
- **Purpose**: Handle window resize events and responsive breakpoints
- **Key Features**:
  - Breakpoint properties: `smallMobile`, `mobile`, `verticalTablet`, `tablet`, `laptop`, `desktop`
  - Observable: `windowSizeChanged$` (BehaviorSubject)
  - Method: `checkBreakpoints(windowSize)` - Update breakpoint flags
  - Method: `logAllBreakpoints()` - Debug logging
- **Breakpoints**:
  - smallMobile: < 360px
  - mobile: < 576px
  - verticalTablet: < 768px
  - tablet: < 992px
  - laptop: < 1200px
  - desktop: < 1412px
- **Usage**: Used by AppComponent for responsive behavior
- **No API calls** - purely DOM event handling

### No Data/API Services

**Important**: No HTTP services, no API communication layers, no data services found.

HttpClient is provided in app.config but not used for API communication.

---

## 4. Routing Structure

**File**: `src/app/app.routes.ts`

### Main Routes

```typescript
Routes: [
  // Default redirect
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Lazy-loaded page components
  { path: 'home', loadComponent: () => HomeComponent },
  { path: 'our_praxis', loadComponent: () => AboutComponent },
  { path: 'team', loadComponent: () => TeamComponent },
  { path: 'leistungen', loadComponent: () => PerformancesComponent },
  { path: 'contact', loadComponent: () => ContactComponent },
  { path: 'arrival', loadComponent: () => ArrivalComponent },
  { path: 'impressum', loadComponent: () => ImpressumComponent },
  { path: 'privacy_policy', loadComponent: () => PrivacyPolicyComponent },

  // Wildcard redirect
  { path: '**', redirectTo: '/home' }
]
```

### Component Hierarchy

```
AppComponent (root)
└── MainComponent (router outlet container)
    ├── HeaderComponent (always visible)
    ├── [Current Page Component] (routed)
    └── FooterComponent (always visible)
```

### Routing Features

- **Strategy**: Lazy loading with `loadComponent()`
- **Scroll Behavior**: `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`
- **German Routes**: `our_praxis`, `leistungen` (German route names)
- **English Fallback**: `/home`, `/team`, `/contact`, `/arrival`, `/impressum`, `/privacy_policy`
- **No Guards**: No route guards implemented
- **No Nested Routes**: All routes are top-level

---

## 5. State Management

**State Management Used**: **NONE**

### Current Approach

**Local Component State Only**:
- Component properties
- Angular form state (if used)
- Template variable bindings

### Observable-Based Communication

Limited use of RxJS for component communication:

1. **ScrollTrackerService**
   - Emits active section via BehaviorSubject
   - Subscribed by HeaderComponent

2. **WindowService**
   - Emits window size changes via BehaviorSubject
   - Subscribed by AppComponent and components needing responsive behavior

### No Global State Management

- **No Redux/NgRx**: Not implemented
- **No Akita**: Not implemented
- **No BabyTron**: Not implemented
- **No NgRx Store**: Not implemented
- **No AngularJS-style $rootScope**: Not applicable in Angular 19

### Data Management

**Static Data**:
- Hard-coded content in templates
- Data constants in `models_interfaces.ts`:
  - `TeamEmployee` class (url, name)
  - `ImagesCarouselObject` class (id, url, alt)
  - Vacation messages (constants): `sommarUrlaub`, `christmasUrlaub`, `sommarUrlaubTest`

### No Backend Communication

- No API service layer
- No data fetching from backend
- All data is static or locally managed

---

## Additional Components & Utilities

### Directives (1)

**hyphenate.directive.ts**
- Custom directive (purpose: to be determined from implementation)

### SVG Icon System (20+ components)

Icon components for various uses:
- Logos: ADC Logo, BytLock Logo, Skin Cancer Icon
- Navigation: Close X, Up Arrow Circle, Exit
- Status: Fill Check Circle, Empty Circle
- Business: Company, Container, Appointment, Author
- Media: Meet/Video/Cam, Smile Chat
- Utility: Loader, Spinner, Vacation, Recycle Bin, House, Up/Down Toggle

All SVG icons are inline component templates (no external files).

### Angular Forms

- FormsModule imported globally in app.config
- Available for use in components (no FormBuilder service observed)

### ng-zorro-antd Integration

- 16 Ant Design icons registered in app.config
- ng-zorro CSS imported in global styles
- NzIconModule configured for German locale (de_DE)

---

## Summary Table

| Aspect | Details |
|--------|---------|
| **Architecture** | Standalone components, no NgModule |
| **Components** | 21 (9 pages + 12 shared) + 20 SVG icons |
| **Services** | 2 (ScrollTracker, Window) - no API services |
| **Routing** | Lazy-loaded, 8 main routes, German route names |
| **State Management** | None - local component state only |
| **Data Management** | Static/hardcoded, no backend communication |
| **Styling** | SCSS global + scoped per component |
| **Animations** | 60+ custom animations library |
| **UI Library** | ng-zorro-antd + Bootstrap 5 |
| **Change Detection** | Zone.js with coalescing enabled |

---

## Conclusion

This is a **static, content-focused website** with:
- No backend API communication
- No database integration
- No complex state management
- Focus on presentation and user interaction
- Responsive design with breakpoint detection
- Rich animation capabilities
- German-language medical practice website

All data is embedded in components or configured as constants. There is no mechanism for fetching or managing dynamic data from a backend service.

---

**Document Generated**: 2026-03-22
**Status**: READ-ONLY ANALYSIS
**No Files Modified**
