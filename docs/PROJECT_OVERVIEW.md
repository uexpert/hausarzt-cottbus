# Hausarzt Cottbus - Project Overview

## Project Purpose

Hausarzt Cottbus is a professional web application for a medical practice ("Hausarzt" = General Practitioner in German) located in Cottbus. The site serves to:

- Provide information about the medical practice and services
- Display team members and their profiles
- Show practice details (location, hours, contact information)
- Present news and updates about the practice
- Enable patient contact and inquiries
- Display performance/specializations of the practice

## Tech Stack

### Frontend Framework & Core
- **Angular**: v19.2.0 (Latest standalone components)
- **TypeScript**: v5.7.2
- **RxJS**: 7.8.0

### UI & Styling
- **ng-zorro-antd**: v19.2.1 (Ant Design component library)
- **Bootstrap**: 5.x (included via CDN in HTML)
- **SCSS**: Custom styling with SCSS compilation

### Animation & Interactivity
- **Angular Animations**: Native Angular animation library
- **Owl Carousel**: v2.x (Image/review carousel)
- **jQuery**: 3.x (DOM manipulation, carousel control)

### Build & Tooling
- **Angular CLI**: v19.2.0
- **Custom Webpack**: @angular-builders/custom-webpack (for extended build configuration)
- **Copy Webpack Plugin**: For copying assets during build

### Testing
- **Karma**: Test runner
- **Jasmine**: Testing framework
- **Angular Testing Utilities**: For component and service testing

## Modules & Components Overview

### Pages (Standalone Components)
Located in `src/app/pages/`:

| Page | Purpose | Route |
|------|---------|-------|
| **main** | Root container for all pages | Root |
| **home** | Landing page with hero section and dynamic news | /home |
| **about** | About the practice and team intro | /our_praxis |
| **team** | Detailed team member profiles | /team |
| **performances** | Medical services and specializations | /leistungen |
| **contact** | Contact form and inquiries | /contact |
| **arrival** | Location, directions, parking info | /arrival |
| **privacy-policy** | GDPR and privacy information | /privacy_policy |
| **impressum** | Legal information (required in Germany) | /impressum |
| **admin-login** | Admin authentication page | /admin/login |
| **admin-dashboard** | News CRUD management with live preview | /admin/dashboard |

### Layout & Shared Components
Located in `src/app/components/`:

| Component | Purpose |
|-----------|---------|
| **header** | Navigation bar and branding |
| **footer** | Footer with links and contact info |
| **hero** | Large hero section (banner) |
| **hero-card** | Reusable hero card component |
| **hero-card-pattern** | Pattern variant for hero cards |
| **images-carousel** | Image gallery with Owl Carousel |
| **latest-news** | News/update display section |
| **team-employees** | Section displaying multiple team members |
| **team-employee** | Individual team member card |
| **contact-infos** | Contact details display |
| **address-map** | Google Maps integration |
| **scroll-to-top** | Sticky scroll-to-top button |

### Core Services & Utilities
Located in `src/app/core/`:

| Service / Utility | Purpose |
|-------------------|---------|
| **NewsService** | Loads, caches, and persists news notices via HTTP; date-based active notice resolution |
| **ScrollTrackerService** | Tracks scroll position for active navigation highlighting |
| **WindowService** | Window resize breakpoint detection |
| **authGuard** | Functional `CanActivateFn` guard protecting `/admin/dashboard` route |
| **NewsNotice** (model) | TypeScript interface for news data (`id`, `title`, `content: ContentBlock[]`, `startDate`, `endDate`, `isActive`, `createdAt`) |
| **ContentBlock** (model) | `{ type, text, align?, indent?, indentDir?, lineHeight? }` — typed plain-text block; `BlockType` is `'paragraph' \| 'heading' \| 'bold' \| 'list-item' \| 'emergency'`; supports `**bold**` inline markers and `{startDate}`/`{endDate}` date parameters |
| **TextTemplate** (model) | `{ id, name, blocks: ContentBlock[] }` — saved reusable block group (single or multi-block); stored in localStorage under `hac_text_templates` |
| **TitleTemplate** (model) | `{ id, text }` — saved title template; may contain `{startDate}`/`{endDate}` placeholders; stored in localStorage under `hac_title_templates` |
| **renderBlocks** (utility) | Pure function in `content-block.renderer.ts` — maps `ContentBlock[]` + optional `RenderContext` to safe HTML; pipeline: HTML-escape → date substitution → `**bold**` → CSS classes; no `style=""` attributes |
| **DialogService** | Root-level injectable returning `Promise<string\|null>` from `prompt()` and `Promise<boolean>` from `confirm()`; `DialogComponent` at `AppComponent` level renders the overlay |

### Backend (PHP)
Located in `public/api/`:

| File | Purpose |
|------|---------|
| **save-news.php** | POST endpoint that validates `X-API-Key` header and writes news JSON to `public/data/news.json` |

### Data Files
Located in `public/data/`:

| File | Purpose |
|------|---------|
| **news.json** | JSON array of `NewsNotice` objects, read by frontend and written by PHP backend |

### Animation Library
Located in `src/app/core/animations-lib/`:

Comprehensive animation library with categories:
- **Attention Seekers**: bounce, flash, head-shake, heart-beat, jello, pulse, rubber-band, shake, swing, tada, wobble
- **Entrance Animations**: bounce-in, fade-in (variants), flip-in, rotate-in, slide-in, zoom-in
- **Exit Animations**: bounce-out, fade-out (variants), flip-out, rotate-out, slide-out, zoom-out
- **Special Animations**: hinge, jack-in-the-box, roll-in/out, light-speed, collapse, hue-rotate, rotate

## Project Structure

```
src/
├── app/
│   ├── pages/              # Route components
│   │   ├── home/
│   │   ├── about/
│   │   ├── team/
│   │   ├── contact/
│   │   ├── performances/
│   │   ├── arrival/
│   │   ├── privacy-policy/
│   │   ├── impressum/
│   │   ├── main/           # Root container
│   │   └── admin/          # Admin area
│   │       ├── admin-login/
│   │       └── admin-dashboard/
│   ├── components/          # Reusable UI components
│   ├── core/               # Services, guards & utilities
│   │   ├── services/       # NewsService, ScrollTracker, WindowService, DialogService
│   │   ├── components/     # DialogComponent (global dialog host)
│   │   ├── guards/         # authGuard
│   │   ├── utils/          # Models (NewsNotice, ContentBlock, TextTemplate, TitleTemplate), content-block.renderer.ts, constants
│   │   └── animations-lib/
│   ├── app.component.ts    # Root component
│   ├── app.routes.ts       # Route definitions (incl. admin)
│   └── app.config.ts       # Application providers
├── assets/                 # Static assets (images, JS libs)
├── environments/           # Environment configuration
├── styles.scss            # Global styles
├── index.html            # HTML entry point
└── main.ts               # Bootstrap file
public/                    # Public static files
├── api/
│   └── save-news.php     # PHP endpoint for saving news
├── data/
│   └── news.json         # Dynamic news data
└── favicon.ico
dist/                      # Build output
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 19+ installed globally

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server
npm start
# or
ng serve

# Navigate to http://localhost:4200/
# App auto-reloads on file changes
```

### Building for Production
```bash
# Build for production
npm run build

# For development environment build (with base-href)
npm run build:usama-dev

# Output will be in dist/hausarzt-cottbus/
```

### Running Tests
```bash
# Run unit tests
npm run test
```

## Key Features

### Dynamic News Management
- Admin dashboard for creating, editing, and deleting news notices
- Multiple notices can be active simultaneously; all are shown on the home page under a single "Aktuelles!" heading
- Date-range based activation (notices auto-show/hide by date); section hidden entirely when no notices are active
- Live preview of news before publishing (shows "Aktuelles!" heading above card, just like public page)
- PHP backend persists changes to `news.json` on server
- API key secured save endpoint

### Admin Panel
- Password-protected admin login at `/admin/login`
- Route guard (`authGuard`) protects dashboard
- CRUD interface for news notices with toggle activate/deactivate
- localStorage-based session token
- Block-builder content editor with per-block type, alignment, indent (1–10 em, left/right), and line-height controls
- Inline bold via `**text**` syntax; date parameters `{startDate}`/`{endDate}` in block text and titles
- Reusable text templates (single-block and multi-block) and title templates stored in localStorage
- Drag-and-drop and up/down button block reordering
- Application-specific dialog system (no browser `prompt()`/`confirm()` calls)

### Responsive Design
- Mobile-first approach
- Bootstrap grid system for layout
- CSS media queries for different breakpoints
- Window service tracks viewport changes

### Performance Optimizations
- Standalone Angular components (no NgModule)
- Lazy-loaded routes via `loadComponent()`
- Cache-busted news data fetching
- Angular CLI production build optimizations
- Asset minification and bundling

### Rich Animations
- Custom animation library with 60+ animations
- Smooth page transitions
- Scroll-triggered animations
- Hover and interaction effects

### SEO Friendly
- Semantic HTML structure
- Metadata and title management
- Image optimization
- Link structure for navigation

## Deployment

### Build Output
- Location: `dist/hausarzt-cottbus/`
- Configuration: Custom webpack for .htaccess copying
- Base href can be customized via build scripts

### Deployment Steps
1. Run `npm run build` (or `build:usama-dev` for subfolder deployment)
2. Upload contents of `dist/hausarzt-cottbus/` to web server
3. Ensure `.htaccess` file is included for routing support

## Development Notes

### Styling
- Uses SCSS for all custom styles
- ng-zorro-antd CSS included in global styles
- Bootstrap CSS loaded before custom styles
- Responsive breakpoints: xs(0), sm(576px), md(768px), lg(992px), xl(1200px)

### Third-Party Libraries
- jQuery used for DOM manipulation (legacy integration)
- Owl Carousel for carousel functionality
- Bootstrap JavaScript for modal/collapse components
- ng-zorro for enterprise UI components

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Angular 19 requires ES2022+ support
- No IE11 support

## Documentation Files

This project includes comprehensive documentation:
- **Architecture.md** - Project structure and routing
- **Angular_Structure.md** - Modules, components, and services
- **UI_Design.md** - Styling conventions and theming
- **Business_Rules.md** - Frontend validation and workflows
- **Setup.md** - Detailed setup instructions
- **CHANGELOG.md** - Version history and updates

See the `/docs` folder for detailed documentation on each topic.
