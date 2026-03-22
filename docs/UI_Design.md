# UI Design & Styling

## Styling Architecture

The project uses a layered styling approach combining multiple CSS frameworks and custom SCSS.

### Layer 1: Third-Party Frameworks

**ng-zorro-antd** (Ant Design)
- Enterprise UI component library
- CSS included in global styles via `styles.scss`
- File: `node_modules/ng-zorro-antd/ng-zorro-antd.min.css`
- Provides: Form components, modals, dropdowns, etc.

**Bootstrap 5**
- Grid system and utility classes
- Grid columns: 12-column responsive grid
- Included in `angular.json` build config and HTML
- Breakpoints: xs(0), sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px)

**Custom Third-Party CSS**
- Various component library stylesheets

### Layer 2: Global Styles

**File**: `src/styles.scss`

Contains:
- CSS custom properties (variables) for theming
- Global utility classes
- Base element styles (reset, typography)
- Responsive utility classes
- Animation keyframe definitions

### Layer 3: Component Styles

**File**: `src/app/components/*/component.component.scss`

Each component has scoped SCSS:
- Component-specific selectors
- BEM naming convention for classes
- Local variables and mixins
- Responsive breakpoints

## CSS Naming Conventions

### BEM (Block Element Modifier)

```scss
.component-name {}           // Block
.component-name__element {}  // Element
.component-name--modifier {} // Modifier
```

Example:
```scss
.hero {}
.hero__title {}
.hero__subtitle {}
.hero--dark {}
.hero--light {}
```

### Classes
- Lowercase with hyphens: `.button-primary`
- Semantic names: `.nav-menu`, `.footer-links`
- State classes: `.is-active`, `.is-disabled`, `.is-loading`
- Utility classes: `.mt-3`, `.p-2` (margin, padding, etc.)

## CSS Variables (Custom Properties)

Theme colors and values defined as CSS variables:

```scss
// Colors
--primary-color: #1890ff;
--secondary-color: #52c41a;
--danger-color: #f5222d;
--warning-color: #faad14;
--success-color: #52c41a;
--info-color: #1890ff;
--text-color: #333333;
--text-secondary: #666666;
--border-color: #d9d9d9;
--background-color: #ffffff;
--background-secondary: #fafafa;

// Typography
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-size-base: 14px;
--line-height-base: 1.5;
--font-weight-normal: 400;
--font-weight-bold: 600;

// Spacing
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;

// Border Radius
--border-radius-sm: 2px;
--border-radius-md: 4px;
--border-radius-lg: 8px;

// Shadows
--box-shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
--box-shadow-md: 0 4px 16px rgba(0,0,0,0.12);
--box-shadow-lg: 0 8px 24px rgba(0,0,0,0.15);

// Transitions
--transition-duration: 0.3s;
--transition-timing: ease-in-out;
```

Usage in components:
```scss
.button {
  color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  transition: all var(--transition-duration) var(--transition-timing);
}
```

## Responsive Design

### Breakpoint System

Following Bootstrap breakpoints:

```scss
// Extra small devices (phones, less than 576px)
$screen-xs: 0;

// Small devices (landscape phones, 576px and up)
$screen-sm: 576px;

// Medium devices (tablets, 768px and up)
$screen-md: 768px;

// Large devices (desktops, 992px and up)
$screen-lg: 992px;

// Extra large devices (large desktops, 1200px and up)
$screen-xl: 1200px;

// XXL devices (1400px and up)
$screen-xxl: 1400px;
```

### SCSS Mixins for Responsive

```scss
// Mobile-first approach
@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Usage
.container {
  padding: 1rem;

  @include respond-to($screen-md) {
    padding: 2rem;
  }

  @include respond-to($screen-lg) {
    padding: 3rem;
  }
}
```

### Utility Classes

Bootstrap utilities included:
- Margin: `.m-*`, `.mt-*`, `.mb-*`, `.ml-*`, `.mr-*`
- Padding: `.p-*`, `.pt-*`, `.pb-*`, `.pl-*`, `.pr-*`
- Display: `.d-none`, `.d-block`, `.d-flex`, `.d-inline-block`
- Grid: `.container`, `.row`, `.col-*`, `.col-md-*`, etc.
- Text: `.text-center`, `.text-left`, `.text-primary`, etc.

## Typography

### Font Stack

Primary font family (defined in CSS variables):
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif
```

### Font Sizes

Base size: 14px (adjustable via CSS variable)

Recommended scale:
- `h1`: 32px - 40px
- `h2`: 28px - 32px
- `h3`: 24px - 28px
- `h4`: 20px - 24px
- `h5`: 16px - 18px
- `h6`: 14px - 16px
- Body: 14px
- Small: 12px

### Font Weights

- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Line Heights

- Headings: 1.2 - 1.35
- Body: 1.5 - 1.6
- Tight: 1.1

## Colors

### Theme Palette

**Primary Colors**
- Primary: `#1890ff` (Blue) - Main actions and highlights
- Secondary: `#52c41a` (Green) - Success states
- Danger: `#f5222d` (Red) - Errors and destructive actions
- Warning: `#faad14` (Orange) - Warnings and alerts
- Success: `#52c41a` (Green) - Success messages
- Info: `#1890ff` (Blue) - Informational content

**Neutral Colors**
- Text Primary: `#333333` - Main text
- Text Secondary: `#666666` - Secondary text, labels
- Border: `#d9d9d9` - Borders and dividers
- Background: `#ffffff` - Main background
- Background Secondary: `#fafafa` - Secondary/alternate backgrounds

**Semantic Colors**
- Success: `#52c41a`
- Warning: `#faad14`
- Error: `#f5222d`
- Info: `#1890ff`

### Color Usage

- **Primary Color**: Buttons, links, active states
- **Secondary Color**: Success states, positive actions
- **Danger Color**: Delete buttons, error messages
- **Warning Color**: Warnings, cautions, alerts
- **Text Color**: Main content text
- **Border Color**: Dividers, borders, outlines
- **Background**: Content areas, cards, sections

## Component Styling Examples

### Button Styles

```scss
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all var(--transition-duration);

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  &--primary {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);

    &:hover {
      opacity: 0.9;
    }
  }

  &--danger {
    background: var(--danger-color);
    color: white;
    border-color: var(--danger-color);
  }
}
```

### Card Styles

```scss
.card {
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow-sm);
  transition: all var(--transition-duration);

  &:hover {
    box-shadow: var(--box-shadow-md);
    transform: translateY(-2px);
  }

  &__header {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  &__title {
    font-size: 18px;
    font-weight: var(--font-weight-bold);
    color: var(--text-color);
    margin: 0;
  }

  &__content {
    color: var(--text-secondary);
    line-height: var(--line-height-base);
  }
}
```

## Animation & Transitions

### Transition Properties

Global transition timing:
```scss
--transition-duration: 0.3s;
--transition-timing: ease-in-out;
```

Common transitions:
- Color changes: 0.2s ease
- Position changes: 0.3s ease-in-out
- Size changes: 0.3s ease-in-out
- Opacity changes: 0.2s ease

### CSS Transitions

```scss
.element {
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
}
```

### Angular Animations

See `Animation_Library.md` for custom Angular animations library.

Common animation triggers:
- `@fade` - Fade in/out
- `@slide` - Slide from direction
- `@scale` - Scale up/down
- `@bounce` - Bounce effect
- `@rotate` - Rotation effect

## Accessibility

### Color Contrast

Ensure WCAG AA compliance (4.5:1 for text):
- Headings: High contrast backgrounds
- Body text: Minimum 4.5:1 ratio
- Large text (18pt+): 3:1 ratio minimum

### Focus States

All interactive elements have visible focus states:
```scss
button, a, input {
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
}
```

### Mobile Touch Targets

Minimum touch target size: 44x44px (iOS guideline)

```scss
button, a[role="button"] {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px; // Ensures hit area
}
```

## Dark Mode (Future)

CSS variables support easy dark mode implementation:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ffffff;
    --background-color: #1f1f1f;
    --border-color: #434343;
    // ... other dark theme values
  }
}
```

## Browser Support

- Modern browsers supporting CSS custom properties (IE 11 not supported)
- ES2022+ JavaScript features
- CSS Grid and Flexbox
- CSS Animations and Transitions
- Media Queries

## Performance Optimization

### CSS Optimization

1. Minimize selector specificity
2. Use CSS classes instead of IDs
3. Leverage CSS variables for DRY styling
4. Use SCSS nesting for related rules
5. Avoid inline styles in templates

### Asset Optimization

- Images optimized before deployment
- SVG icons preferred over image files
- CSS minified in production build
- Unused CSS removed via tree-shaking
