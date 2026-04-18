# Setup & Development Guide

## Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn 3.x)
- **Git**: 2.20 or higher
- **Operating System**: Windows, macOS, or Linux

### Verify Prerequisites

```bash
node --version     # Should be v18.x or higher
npm --version      # Should be 9.x or higher
git --version      # Should be 2.20 or higher
```

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/hausarzt-cottbus.git
cd hausarzt-cottbus
```

### 2. Install Dependencies

```bash
npm install
# or if using yarn
yarn install
```

This will install all packages listed in `package.json`, including:
- Angular and related packages
- ng-zorro-antd for UI components
- Testing frameworks (Karma, Jasmine)
- TypeScript and compilation tools

### 3. Verify Installation

```bash
ng version
# Should show Angular CLI version 19.2.0+

npm list @angular/core
# Should show Angular core version 19.2.0+
```

## Development Environment

### Starting the Development Server

Local development requires **two processes running in parallel**: the Angular dev server for the frontend and a PHP process for the admin save endpoint. Without the PHP process, saving/activating/deleting announcements in the admin dashboard will fail because `ng serve` cannot execute PHP files.

**Terminal 1 — PHP backend:**
```bash
npm run start:php
```
Runs `node server/start-php.js` which launches `php -S localhost:8001 -t server/` — serves the `server/` directory (containing `api/save-news.php`) with real PHP execution. Leave it running. Requires PHP on `PATH` (XAMPP's `C:\xampp\php` works out of the box on Windows).

**Alternative (no PHP):** Run `node server/dev-api.js` instead — a Node.js server that provides the same `/api/save-news.php` endpoint without requiring PHP.

**Terminal 2 — Angular dev server (with proxy):**
```bash
npm start
# or
ng serve --proxy-config proxy.conf.json
```

The application will be available at:
- **Local**: `http://localhost:4200/`
- **Network**: `http://[your-ip]:4200/`

The `proxy.conf.json` forwards requests to `/api/**` from Angular (`:4200`) to PHP (`:8001`), so `/api/save-news.php` is executed by PHP and writes to `public/data/news.json` exactly as it does in production. Static files (including `/data/news.json` and all assets) continue to be served directly by `ng serve`.

The development server includes:
- Hot module replacement (HMR)
- Automatic recompilation on file changes
- Browser live reload
- Detailed error messages

### Frontend-only quick start (no admin persistence)

If you only need to view public pages and do not need to save admin changes, you can run `ng serve` alone — but the admin dashboard save/toggle/delete actions will show an error because `/api/save-news.php` will not execute.

### Development Server Options

```bash
# Start with specific port
ng serve --port 4300

# Start with polling (if file watching doesn't work)
ng serve --poll=2000

# Disable live reload
ng serve --live-reload=false

# Open browser automatically
ng serve --open
```

## Building for Production

### Standard Production Build

```bash
npm run build
# or
ng build
```

Output: `dist/hausarzt-cottbus/`

### Production Build with Custom Base Href

For deploying to a subdirectory (e.g., `example.com/hausarzt-cottbus/`):

```bash
npm run build:usama-dev
# which runs: ng build --base-href /hausarzt-cottbus/
```

This also copies the `.htaccess` file for routing support.

### Build Options

```bash
# Production optimized build
ng build --configuration production

# Development build (unoptimized, with source maps)
ng build --configuration development

# Build with stats JSON for analysis
ng build --stats-json

# Watch for changes and rebuild
ng build --watch
```

### Build Output Structure

```
dist/hausarzt-cottbus/
├── index.html           # Main HTML file
├── styles.css           # Global styles (minified)
├── main.js              # Main bundle (minified)
├── polyfills.js         # Browser polyfills
├── assets/              # Static assets
│   ├── images/
│   ├── js/
│   └── data/
├── .htaccess            # Apache routing configuration
└── other-bundles.js     # Additional chunks
```

## Configuration

### Angular Configuration

**File**: `angular.json`

Key settings:
- `sourceRoot`: `src`
- `prefix`: `app` (for component selectors)
- `inlineStyleLanguage`: `scss`
- `styles`: Global stylesheet paths
- `scripts`: Third-party JS libraries

### Build Budgets

Configured in `angular.json`:
- Initial bundle: 4MB warning, 8MB error
- Component styles: 1MB warning, 2MB error

If exceeded, optimize with:
- Lazy loading for routes
- Component splitting
- Removing unused dependencies
- Code optimization

### TypeScript Configuration

**File**: `tsconfig.json`

Key settings:
- `target`: ES2022
- `lib`: ES2022, DOM, DOM.Iterable
- `moduleResolution`: "bundler"
- `strict`: true (strict type checking enabled)

### Environment Configuration

**Files**:
- `src/environments/environment.ts` (production)
- `src/environments/environment.development.ts` (development)

```typescript
// environment.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};

// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

Access in code:
```typescript
import { environment } from '../environments/environment';

if (environment.production) {
  // Production-only code
}
```

## Testing

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (re-run on file change)
ng test --watch

# Run tests once (CI mode)
ng test --watch=false

# Generate coverage report
ng test --code-coverage
# Report available in `coverage/`
```

### Test Files

Test files located alongside component files:
- `component.component.spec.ts` - Unit tests for component

### E2E Tests

End-to-end tests (if configured):
```bash
ng e2e
```

## Debugging

### Development Tools

1. **Angular DevTools**
   - Browser extension for Chrome
   - Inspect component state
   - Performance profiling
   - Dependency injection inspection

2. **Chrome DevTools**
   - F12 or Ctrl+Shift+I
   - JavaScript debugging
   - Network monitoring
   - Performance analysis

### Debugging Tips

```bash
# Start with source maps enabled
ng serve --source-map

# Debug in VS Code
# Add to .vscode/launch.json:
{
  "type": "chrome",
  "request": "launch",
  "name": "Angular Debug",
  "url": "http://localhost:4200",
  "webRoot": "${workspaceFolder}"
}
```

### Console Logging

```typescript
// Check environment
console.log(environment.production); // false in dev, true in prod

// Component lifecycle logging
ngOnInit() {
  if (!environment.production) {
    console.log('Component initialized');
  }
}
```

## Code Style & Linting

### TypeScript Linting

```bash
# Check code style (if linting configured)
ng lint

# Fix auto-fixable issues
ng lint --fix
```

### Code Formatting

Using Prettier (if configured):

```bash
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .
```

## File Organization

### Component Structure

```
component-name/
├── component-name.component.ts       # Component class
├── component-name.component.html     # Template
├── component-name.component.scss     # Styles
└── component-name.component.spec.ts  # Tests
```

### Service Structure

```
service-name.service.ts              # Service implementation
service-name.service.spec.ts         # Unit tests
```

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/feature-name
git add .
git commit -m "Add feature description"
git push origin feature/feature-name
```

### Creating a Pull Request

After pushing, create a PR on GitHub with:
- Clear description of changes
- Reference to any related issues
- Testing notes

### Committing Changes

Use semantic commit messages:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (formatting, semicolons)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Build, dependencies, tooling

Example:
```bash
git commit -m "feat: add scroll-to-top button"
git commit -m "fix: correct header navigation highlighting"
```

## Troubleshooting

### Port Already in Use

```bash
# Use different port
ng serve --port 4300

# Or kill process on port 4200 (macOS/Linux)
lsof -ti:4200 | xargs kill -9
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Compilation Errors

```bash
# Full rebuild
ng build --configuration development

# Check TypeScript errors
npx tsc --noEmit
```

### Dependencies Conflict

```bash
# Check for outdated packages
npm outdated

# Update packages safely
npm update

# Update Angular specifically
ng update @angular/cli @angular/core
```

### Build Size Too Large

```bash
# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/hausarzt-cottbus/stats.json

# Identify large dependencies
npm ls [package-name]
```

## IDE Setup

### VS Code Configuration

Recommended extensions:
- Angular Language Service
- Prettier
- ESLint
- TypeScript Vue Plugin
- HTML CSS Support

Settings in `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm Configuration

- IntelliJ IDEA Ultimate or WebStorm includes Angular support
- Enable Angular plugin in settings
- Configure code style for SCSS

## Environment-Specific Development

### Local Development

- Use `ng serve` with auto-reload
- Source maps enabled
- Full error messages
- Development environment variables

### Testing Environment

- Production build locally: `ng build --configuration production`
- Verify bundle size
- Test performance
- Test with real data

### Production Simulation

```bash
# Build production version
ng build --configuration production

# Serve locally to test
npx http-server dist/hausarzt-cottbus/

# Visit http://localhost:8080/
```

## Common Tasks

### Generate New Component

```bash
ng generate component components/component-name
# or shorthand
ng g c components/component-name
```

### Generate Service

```bash
ng generate service core/services/service-name
ng g s core/services/service-name
```

### Generate Directive

```bash
ng generate directive core/directives/directive-name
```

### Generate Pipe

```bash
ng generate pipe core/pipes/pipe-name
```

## Next Steps

1. Read `PROJECT_OVERVIEW.md` for project structure
2. Review `Architecture.md` for design patterns
3. Check `Angular_Structure.md` for component details
4. See `UI_Design.md` for styling guidelines
5. Consult `Business_Rules.md` for validation logic
