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
| **home** | Landing page with hero section and key info | / |
| **about** | About the practice and team intro | /about |
| **team** | Detailed team member profiles | /team |
| **performances** | Medical services and specializations | /performances |
| **contact** | Contact form and inquiries | /contact |
| **arrival** | Location, directions, parking info | /arrival |
| **privacy-policy** | GDPR and privacy information | /privacy-policy |
| **impressum** | Legal information (required in Germany) | /impressum |

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

| Service | Purpose |
|---------|---------|
| **scroll-tracker** | Tracks scroll position for active navigation |
| **window** | Window resize breakpoint detection |

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
│   │   └── main/          # Root container
│   ├── components/         # Reusable UI components
│   ├── core/              # Services & utilities
│   │   ├── services/
│   │   └── animations-lib/
│   ├── app.component.ts   # Root component
│   └── app.component.html
├── assets/                # Static assets (images, JS libs)
├── environments/          # Environment configuration
├── styles.scss           # Global styles
├── index.html           # HTML entry point
└── main.ts              # Bootstrap file
public/                   # Public static files
dist/                     # Build output
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

### Responsive Design
- Mobile-first approach
- Bootstrap grid system for layout
- CSS media queries for different breakpoints
- Window service tracks viewport changes

### Performance Optimizations
- Standalone Angular components (no NgModule)
- Angular CLI production build optimizations
- Asset minification and bundling
- Tree-shaking for unused code

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
