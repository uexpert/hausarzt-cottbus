# HausarztCottbus

Professional website for a medical practice (Hausarzt) in Cottbus, Germany. Built with Angular 19 and modern web technologies.

**Documentation**: See the [docs folder](/docs/) for comprehensive project documentation.

## Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Git

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/` and automatically reload on file changes.

### Production Build

```bash
# Standard production build
npm run build

# Build for subfolder deployment
npm run build:usama-dev
```

## Project Documentation

Comprehensive documentation is available in the `/docs` folder:

### Quick References
- **[PROJECT_OVERVIEW.md](/docs/PROJECT_OVERVIEW.md)** - Main reference with project purpose, tech stack, and structure
- **[Setup.md](/docs/Setup.md)** - Development environment setup and common tasks
- **[Architecture.md](/docs/Architecture.md)** - Project structure, routing, and build pipeline

### Detailed Guides
- **[Angular_Structure.md](/docs/Angular_Structure.md)** - Components, services, and modules documentation
- **[UI_Design.md](/docs/UI_Design.md)** - Styling conventions, CSS variables, and responsive design
- **[Business_Rules.md](/docs/Business_Rules.md)** - Frontend validation, workflows, and business logic
- **[CHANGELOG.md](/docs/CHANGELOG.md)** - Version history and release notes

## Key Features

- **Dynamic News Management**: Admin dashboard to create, edit, and publish news notices
- **Admin Panel**: Password-protected at `/admin/login`, with route guard protection
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Standalone Components**: Modern Angular architecture with no NgModule
- **Rich Animations**: 60+ custom animations library
- **UI Components**: ng-zorro-antd for enterprise components
- **SEO Friendly**: Semantic HTML and proper structure
- **Google Maps**: Interactive location map
- **Image Galleries**: Owl Carousel integration
- **PHP Backend**: Simple API endpoint for persisting news data

## Tech Stack

- **Angular**: 19.2.0
- **TypeScript**: 5.7.2
- **SCSS**: Custom styling
- **ng-zorro-antd**: UI components
- **Bootstrap 5**: Grid and utilities
- **Owl Carousel**: Image carousels
- **Testing**: Karma & Jasmine

## Common Commands

```bash
# Development
npm start                    # Start dev server
npm run test               # Run unit tests

# Production
npm run build              # Build for production
npm run build:usama-dev    # Build with custom base-href

# Code Quality
ng lint                    # Check code style
ng lint --fix             # Fix auto-fixable issues

# Scaffolding
ng generate component name # Create new component
ng generate service name   # Create new service
```

## Project Structure

```
src/
├── app/
│   ├── pages/         # Route components (home, about, team, admin, etc.)
│   ├── components/    # Reusable UI components
│   ├── core/         # Services, guards, models, utilities
│   └── app.component.ts
├── assets/           # Images and static files
├── styles.scss       # Global styles
└── index.html        # Entry point

public/
├── api/              # PHP backend (save-news.php)
└── data/             # Dynamic data (news.json)
dist/                 # Production build output
docs/                 # Comprehensive documentation
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Angular 19 requires ES2022+ support
- IE11 not supported

## Performance

- Production build with optimization enabled
- Bundle size budgets: 4MB initial, 8MB total
- Asset minification and tree-shaking
- Source maps in development

## Deployment

Build output is in `dist/hausarzt-cottbus/`. Include the `.htaccess` file for proper routing support on Apache servers.

## Testing

```bash
ng test               # Run tests in watch mode
ng test --watch=false # Run tests once
ng test --code-coverage # Generate coverage report
```

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [ng-zorro-antd Documentation](https://ng.ant.design/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/)

## License

See LICENSE file for details.

---

**For detailed development guidelines, setup instructions, and architecture information, please see the [documentation](/docs/) folder.**
