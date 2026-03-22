# Changelog

All notable changes to the Hausarzt Cottbus project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Documentation structure and guides in `/docs` folder
- PROJECT_OVERVIEW.md for main project reference
- Architecture.md for project structure details
- Angular_Structure.md for components and services documentation
- UI_Design.md for styling guidelines
- Business_Rules.md for validation workflows
- Setup.md for development environment setup
- `NewsNotice` interface model (`src/app/core/utils/news.model.ts`)
- `NewsService` with HTTP load/save, BehaviorSubject state, localStorage cache, and API key auth
- `authGuard` functional route guard for admin area (`src/app/core/guards/auth.guard.ts`)
- Admin login page (`/admin/login`) with password authentication
- Admin dashboard (`/admin/dashboard`) with full CRUD for news notices, live preview, and server persistence
- Admin routes added to `app.routes.ts` with lazy loading and guard protection
- PHP save endpoint (`public/api/save-news.php`) with `X-API-Key` validation
- Static news data file (`public/data/news.json`) replacing hardcoded constants

### Changed
- `HomeComponent` now loads news dynamically via `NewsService` instead of static `christmasUrlaub` constant
- `app.routes.ts` restructured with admin child routes and `authGuard`
- Documentation synced: PROJECT_OVERVIEW, Architecture, Angular_Structure, Business_Rules updated to reflect admin system, NewsService, guards, and PHP backend

### Fixed

### Removed
- `HomeComponent` no longer imports `christmasUrlaub` / `sommarUrlaub` constants (still exist in `models_interfaces.ts` but unused)

---

## [0.0.0] - Initial Release

### Added
- Angular 19.2.0 setup with standalone components
- Page components: Home, About, Team, Contact, Performances, Arrival, Privacy Policy, Impressum
- Reusable UI components: Header, Footer, Hero, Cards, Carousel, etc.
- Core services: ScrollTracker, WindowService
- Custom animation library with 60+ animations
- ng-zorro-antd integration for enterprise UI components
- Bootstrap 5 for responsive grid and utilities
- Owl Carousel for image galleries
- Google Maps integration for practice location
- Responsive design with mobile-first approach
- SCSS styling with CSS custom properties
- Development server setup
- Production build configuration with asset optimization
- Unit testing setup with Karma and Jasmine

---

## Version Format

### Major Changes (X.0.0)
- Breaking changes to API or routing
- Major new features
- Significant refactoring
- Update dependencies across multiple packages

### Minor Changes (0.X.0)
- New features that are backwards compatible
- New components or services
- Enhancements to existing features
- Bug fixes

### Patch Changes (0.0.X)
- Small bug fixes
- Documentation updates
- Performance improvements
- Minor UI tweaks

---

## Future Roadmap

### Planned Features

#### Phase 1: Enhanced Content
- [x] Dynamic news section with admin management
- [ ] Staff member search and filtering
- [ ] Advanced search functionality
- [ ] Image gallery with lightbox

#### Phase 2: Interactivity
- [ ] Online appointment booking system
- [ ] Patient portal login
- [ ] Live chat support
- [ ] Contact form with email integration
- [ ] Newsletter subscription

#### Phase 3: Performance & SEO
- [ ] Implement service worker for offline support
- [ ] Progressive Web App (PWA) features
- [ ] Enhanced SEO with structured data
- [ ] Performance optimization and caching
- [ ] Internationalization (i18n) support

#### Phase 4: Administration
- [x] Admin dashboard for news content management
- [x] Admin login with route guard protection
- [ ] Appointment management system
- [ ] Staff scheduling system
- [ ] Analytics dashboard
- [ ] Email marketing integration

---

## How to Update This Changelog

### When Making Changes

1. Add entry under `[Unreleased]` section
2. Use appropriate category: Added, Changed, Fixed, Removed
3. Provide clear description of change
4. Reference issue or PR number if applicable

### Example Entry

```markdown
### Added
- New component for patient reviews (#42)
- Performance improvement for carousel on mobile devices
- Documentation for animation library

### Fixed
- Email validation regex not accepting some valid formats (fixes #41)
- Mobile menu not closing after navigation
```

### Releasing a Version

1. Create a new section with version number and date
2. Keep the `[Unreleased]` section empty or with header only
3. Update version in `package.json`
4. Create a git tag: `git tag v0.1.0`
5. Push tag: `git push origin v0.1.0`

---

## Release Checklist

Before releasing a new version:

- [ ] All tests passing (`npm run test`)
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Git tag created
- [ ] Release notes prepared
- [ ] Deployment verification completed

---

## Notes

- Versions prior to 1.0.0 may have breaking changes
- All dates in YYYY-MM-DD format
- Semantic versioning followed strictly
- Breaking changes highlighted in MAJOR version updates
