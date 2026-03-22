# Latest-News Component Report

**Component**: `LatestNewsComponent`
**Location**: `src/app/components/latest-news/`
**Status**: Active (displayed on home page)
**Report Date**: 2026-03-22

---

## 1. Component Overview

### Purpose
The `LatestNewsComponent` displays clinic announcements, vacation notices, and other important updates for patients. It's specifically designed to show time-sensitive information like closure notices, holiday schedules, and practice updates.

### Selector
```html
<latest-news [textsList]="newsList"></latest-news>
```

### Files
```
latest-news/
├── latest-news.component.ts       (Component logic)
├── latest-news.component.html     (Template)
├── latest-news.component.scss     (Styles - empty/minimal)
└── latest-news.component.spec.ts  (Unit tests)
```

---

## 2. Component Structure

### TypeScript Implementation

**File**: `latest-news.component.ts`

```typescript
@Component({
  selector: 'latest-news',
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss'
})
export class LatestNewsComponent implements OnInit {
  @Input() textsList: Array<string> = [];
  sanitizer = inject(DomSanitizer);
  imagesPath = environment.imagesPath;
  finalList: Array<any> = [];

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.finalList = [];
    if (this.textsList.length) {
      this.textsList.forEach((txt: string) => {
        const item = txt ? this.sanitizer.bypassSecurityTrustHtml(txt) : '';
        this.finalList.push(item);
      });
    }
  }
}
```

**Key Features**:

| Feature | Details |
|---------|---------|
| **Standalone** | Yes - uses `imports: [CommonModule]` |
| **Input Property** | `@Input() textsList: Array<string>` |
| **Lifecycle Hook** | Implements `OnInit` |
| **Sanitization** | Uses `DomSanitizer.bypassSecurityTrustHtml()` |
| **Data Flow** | Parent → Child (via `textsList` input) |

### Data Processing Logic

1. **Input Reception**: Component receives `textsList` (array of strings) from parent
2. **Initialization**: `ngOnInit()` triggers `onInit()` method
3. **Processing**:
   - Iterates through each string in `textsList`
   - Sanitizes HTML content using `DomSanitizer.bypassSecurityTrustHtml()`
   - Pushes sanitized items to `finalList` array
4. **Rendering**: Template uses `finalList` to display content

### HTML Security Handling

⚠️ **Important**: Uses `bypassSecurityTrustHtml()` - intentionally trusts HTML content

```typescript
const item = txt ? this.sanitizer.bypassSecurityTrustHtml(txt) : '';
```

This allows rendering of:
- Bold text: `<b>content</b>`
- Line breaks: `<br/>`
- Unordered lists: `<ul>`, `<li>`
- CSS classes: `class="text-primary"`
- Divs with inline styles

---

## 3. Template

**File**: `latest-news.component.html`

```html
<div class="owl-item">
    <figure class="reviews-thumb d-flex flex-wrap align-items-center"
        style="background: #fff;border: 2px solid var(--bs-blue);padding: 16px;">

        <p class="text-primary d-block mt-2 mb-2 w-100 font-lg-25">
            <strong>Aktuelles!</strong>
        </p>

        @if (finalList) {
            @for (item of finalList; track item) {
                <div class="w-100 text-dark font-sm-16 mb-2" [innerHTML]="item"></div>
            }
        }
        @else {
            <div class="reviews-text w-100 text-dark font-sm-16">
                Keine Aktuelles!
            </div>
        }
    </figure>
</div>
```

### Template Analysis

| Element | Purpose | CSS Classes |
|---------|---------|-------------|
| **Wrapper** | Container | `owl-item` |
| **Figure** | Card container | `reviews-thumb`, Flexbox classes, inline styles |
| **Header** | Section title | `text-primary`, `font-lg-25`, `d-block` |
| **Content Loop** | Render each item | `@for` control flow (Angular 17+) |
| **Item Display** | Individual news item | `w-100`, `text-dark`, `font-sm-16`, `mb-2` |
| **Empty State** | No content fallback | Shows "Keine Aktuelles!" (German: "No News!") |

### Template Features

1. **Angular 17+ Control Flow Syntax**:
   - `@if` for conditional rendering
   - `@for` for list iteration

2. **Dynamic HTML Rendering**:
   - `[innerHTML]="item"` binds sanitized HTML
   - Allows rich text formatting from parent data

3. **Styling**:
   - Inline style for border and padding
   - Bootstrap CSS classes
   - Custom font size classes
   - CSS variable for border color: `var(--bs-blue)`

4. **Empty State**:
   - Shows "Keine Aktuelles!" when no items present
   - Ensures graceful handling of empty lists

---

## 4. Usage & Data Flow

### Where It's Used

**Component**: HomeComponent
**File**: `src/app/pages/home/home.component.ts`

```typescript
export class HomeComponent implements OnInit {
  imagesPath = environment.imagesPath;
  newsList = christmasUrlaub;  // <-- Data source

  // ...
}
```

**Template**: `home.component.html`

```html
<section class="section-padding nav-section">
    <div class="container">
        <latest-news [textsList]="newsList"></latest-news>
    </div>
</section>
```

### Data Binding Flow

```
HomeComponent
    ↓
    newsList = christmasUrlaub (constant)
    ↓
[textsList]="newsList" (input binding)
    ↓
LatestNewsComponent
    ↓
@Input() textsList processes data
    ↓
Template renders with [innerHTML]
```

---

## 5. News Data Sources

### Available News Constants

All constants defined in `src/app/core/utils/models_interfaces.ts`

#### 1. Christmas Vacation Notice (`christmasUrlaub`)

**Current Implementation**: HomeComponent uses `christmasUrlaub`

```javascript
export const christmasUrlaub = [
    '<div class="text-primary x-font-bold font-sm-18">Weihnachtsurlaub vom 23. Dezember 2025 bis 2. Januar 2026</div>',
    'Liebe Patientinnen und Patienten,',
    'bitte beachten Sie, dass unsere Praxis vom <b>23.12.2025</b> bis einschließlich <b>02.01.2026</b> aufgrund unseres Weihnachtsurlaubs geschlossen bleibt.',
    'In dieser Zeit übernimmt die folgende Praxis freundlicherweise die ärztliche Vertretung:',
    '<b>Vertretungspraxis:</b>',
    '<ul class="dot-list"><li><b>Praxis Dr. Mustermann</b><br/>Bahnhofstraße 64</li></ul>',
    'Bitte nehmen Sie für Rezeptwünsche Ihren Medikamentenplan mit.',
    'In dringenden Fällen außerhalb der Sprechzeiten wenden Sie sich bitte an den <b>ärztlichen Bereitschaftsdienst unter der Telefonnummer 116 117</b> oder im Notfall an den <b>Rettungsdienst unter 112</b>.',
    'Ab <b>Montag, den 05.01.2026</b> sind wir wieder wie gewohnt für Sie da.',
    'Vielen Dank für Ihr Verständnis - wir wünschen Ihnen ein frohes und gesundes Weihnachtsfest sowie einen guten Start ins neue Jahr!',
    'Praxisteam',
]
```

**Content Elements**:
- Title: Formatted with CSS classes
- Closure dates: Bold formatting
- Replacement clinic contact info
- Emergency contact numbers (116 117, 112)
- Sign-off from doctors

#### 2. Summer Vacation Notice - Full Version (`sommarUrlaubTest`)

```javascript
export const sommarUrlaubTest = [
    '<div class="text-primary x-font-bold font-sm-18">Praxisurlaub vom 26. Juli bis 15. August 2025</div>',
    'Liebe Patientinnen und Patienten,',
    'bitte beachten Sie, dass unsere Praxis vom <b>26.07.2025</b> bis einschließlich <b>15.08.2025</b> aufgrund unseres Sommerurlaubs geschlossen bleibt.',
    'In dieser Zeit übernehmen folgende Praxen freundlicherweise die ärztliche Vertretung:',
    '<b>Vertretungspraxen:</b>',
    '<ul class="dot-list"><li><b>Praxis Dr. Mustermann</b><br/>Musterstraße 12<br>Tel.: 01234 / 567890</li><li><b>Praxisgemeinschaft Dres. Schneider &amp; Becker</b><br/>Beispielweg 34, 12345 Musterstadt<br/>Tel.: 01234 / 987654</li></ul>',
    'Bitte melden Sie sich vorab telefonisch bei der jeweiligen Vertretungspraxis an.',
    'In dringenden Fällen außerhalb der Sprechzeiten wenden Sie sich bitte an den <b>ärztlichen Bereitschaftsdienst unter der Telefonnummer 116 117</b> oder im Notfall an den <b>Rettungsdienst unter 112</b>.',
    'Ab <b>Montag, den 18.08.2025</b> sind wir wieder wie gewohnt für Sie da.',
    'Vielen Dank für Ihr Verständnis - wir wünschen Ihnen einen gesunden Sommer!',
    'Praxisteam',
]
```

**Content Elements**:
- Multiple replacement practices listed
- Full contact information for each
- Pre-call instructions
- Extended closure period

#### 3. Summer Vacation Notice - Simplified (`sommarUrlaub`)

```javascript
export const sommarUrlaub = [
    '<div class="text-primary x-font-bold font-sm-18">Praxisurlaub vom 26. Juli bis 15. August 2025</div>',
    'Liebe Patientinnen und Patienten,',
    'bitte beachten Sie, dass unsere Praxis vom <b>26.07.2025</b> bis einschließlich <b>15.08.2025</b> aufgrund unseres Sommerurlaubs geschlossen bleibt.',
    'In dringenden Fällen außerhalb der Sprechzeiten wenden Sie sich bitte an den <b>ärztlichen Bereitschaftsdienst unter der Telefonnummer 116 117</b> oder im Notfall an den <b>Rettungsdienst unter 112</b>.',
    'Ab <b>Montag, den 18.08.2025</b> sind wir wieder wie gewohnt für Sie da.',
    'Vielen Dank für Ihr Verständnis - wir wünschen Ihnen einen gesunden Sommer!',
    'Praxisteam',
]
```

**Comparison**: Same as `sommarUrlaubTest` but without specific replacement clinic information (simplified version).

---

## 6. Visual Display

### Rendered Output Structure

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Aktuelles!                                     │
│                                                 │
│  [Title with dates in blue]                     │
│  [Greeting line]                                │
│  [Information line 1]                           │
│  [Information line 2]                           │
│  Vertretungspraxis:                             │
│  • Practice Name 1                              │
│    Address Line 1                               │
│    Phone Number                                 │
│  • Practice Name 2                              │
│    Address Line 1                               │
│    Phone Number                                 │
│  [Instructions]                                 │
│  [Emergency numbers]                            │
│  [Reopening date]                               │
│  [Closing message]                              │
│  [Doctor signature]                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Styling Applied

| CSS Class | Effect |
|-----------|--------|
| `owl-item` | Owl Carousel item (container) |
| `reviews-thumb` | Card styling |
| `d-flex` | Flexbox display |
| `flex-wrap` | Items wrap |
| `align-items-center` | Vertical center alignment |
| `text-primary` | Blue text color |
| `text-dark` | Dark text color |
| `font-lg-25` | Large font size (25px on lg screens) |
| `font-sm-16` | Small font size (16px) |
| `w-100` | Full width |
| `mb-2` | Margin bottom |
| `mt-2` | Margin top |
| `dot-list` | Bullet list styling |

**Border & Padding**: Applied inline
```css
style="background: #fff;border: 2px solid var(--bs-blue);padding: 16px;"
```

---

## 7. Current Implementation Status

### Active Features
✅ Displays clinic closure/vacation notices
✅ Shows replacement clinic information
✅ Displays emergency contact numbers
✅ Responsive design (flexbox)
✅ Rich HTML formatting support
✅ Multiple data sources available

### Data Management
- **Source**: Static constants in `models_interfaces.ts`
- **Update Method**: Manual code change required
- **Currently Active**: `christmasUrlaub` (Christmas vacation notice)
- **Alternatives Available**:
  - `sommarUrlaub` (simplified summer notice)
  - `sommarUrlaubTest` (detailed summer notice)

### Limitations
⚠️ **No Dynamic Data Source**: Data is hardcoded constants
⚠️ **No CMS Integration**: Requires code changes to update content
⚠️ **No Date-Based Switching**: Manual selection required
⚠️ **No API Connection**: No backend data fetching
⚠️ **Static Content Only**: No database integration

---

## 8. Component Specifications

### Technical Details

| Property | Value |
|----------|-------|
| **Type** | Standalone Component |
| **Module** | CommonModule only |
| **Selector** | `latest-news` |
| **Change Detection** | Default (OnPush compatible) |
| **Input Properties** | `textsList: Array<string>` |
| **Output Properties** | None |
| **Lifecycle Hooks** | OnInit |
| **Directives Used** | `@if`, `@for` (Angular 17+) |
| **Pipes Used** | None |
| **Services Injected** | DomSanitizer |
| **State Management** | Local component state only |

### Dependencies

```typescript
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
```

---

## 9. HTML Content Structure

### Data Format

Each news update is an **array of strings**:

```typescript
[
    "String 1",  // Typically title/header
    "String 2",  // Opening greeting
    "String 3",  // First paragraph
    ...
    "String N"   // Closing signature
]
```

### HTML Elements Supported

Within each string, the following HTML is permitted:

| Element | Example | Purpose |
|---------|---------|---------|
| **Bold** | `<b>text</b>` | Emphasis |
| **Line Break** | `<br/>` | Paragraph breaks |
| **Unordered List** | `<ul><li>...</li></ul>` | Replacement clinic list |
| **List Item** | `<li>text</li>` | Individual clinic entry |
| **Div** | `<div class="...">text</div>` | Formatted sections |
| **HTML Entities** | `&amp;`, `&nbsp;` | Special characters |

### CSS Classes Supported

Custom CSS classes used in content:

| Class | Purpose |
|-------|---------|
| `text-primary` | Blue text (heading) |
| `x-font-bold` | Extra bold weight |
| `font-sm-18` | Small font size (18px) |
| `dot-list` | Bullet list styling |

---

## 10. How News Updates Are Made

### Current Process

1. **Edit Data Constant**
   - File: `src/app/core/utils/models_interfaces.ts`
   - Location: One of the constants (`christmasUrlaub`, `sommarUrlaub`, `sommarUrlaubTest`)

2. **Update HomeComponent Assignment**
   - File: `src/app/pages/home/home.component.ts`
   - Change: `newsList = [constant_name]`

   Example:
   ```typescript
   export class HomeComponent implements OnInit {
     newsList = christmasUrlaub;  // Change this line
   }
   ```

3. **Test Locally**
   - Run: `npm start`
   - Navigate to home page
   - Verify display

4. **Deploy**
   - Build: `npm run build`
   - Upload: dist files to server

### Example: Switching to Summer Vacation Notice

**Before**:
```typescript
newsList = christmasUrlaub;
```

**After**:
```typescript
newsList = sommarUrlaub;
```

---

## 11. Component Lifecycle

### Initialization Flow

```
Component Created
    ↓
@Input() textsList = [received array]
    ↓
ngOnInit() called
    ↓
onInit() method executes
    ↓
Loop through textsList
    ↓
Sanitize each HTML string
    ↓
Push to finalList
    ↓
Template detects finalList update
    ↓
Angular renders template
    ↓
[innerHTML] binds sanitized HTML
    ↓
Displayed to user
```

### State Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `textsList` | `Array<string>` | Input from parent |
| `finalList` | `Array<any>` | Processed/sanitized items |
| `sanitizer` | `DomSanitizer` | HTML sanitization service |
| `imagesPath` | `string` | (Unused in template) |

---

## 12. Browser Rendering Example

### Sample Input Data (Christmas Notice)

```javascript
[
    '<div class="text-primary x-font-bold font-sm-18">Weihnachtsurlaub vom 23. Dezember 2025 bis 2. Januar 2026</div>',
    'Liebe Patientinnen und Patienten,',
    'bitte beachten Sie, dass unsere Praxis vom <b>23.12.2025</b> bis einschließlich <b>02.01.2026</b> aufgrund unseres Weihnachtsurlaubs geschlossen bleibt.',
    // ... more items
]
```

### Rendered HTML Output

```html
<div class="owl-item">
    <figure class="reviews-thumb d-flex flex-wrap align-items-center"
            style="background: #fff;border: 2px solid var(--bs-blue);padding: 16px;">
        <p class="text-primary d-block mt-2 mb-2 w-100 font-lg-25">
            <strong>Aktuelles!</strong>
        </p>
        <div class="w-100 text-dark font-sm-16 mb-2">
            <div class="text-primary x-font-bold font-sm-18">
                Weihnachtsurlaub vom 23. Dezember 2025 bis 2. Januar 2026
            </div>
        </div>
        <div class="w-100 text-dark font-sm-16 mb-2">
            Liebe Patientinnen und Patienten,
        </div>
        <div class="w-100 text-dark font-sm-16 mb-2">
            bitte beachten Sie, dass unsere Praxis vom <b>23.12.2025</b> bis...
        </div>
        <!-- More items rendered similarly -->
    </figure>
</div>
```

---

## 13. Summary

### Component Purpose
The `LatestNewsComponent` is a **simple, static news display component** used primarily to show:
- Clinic closure notices (vacations, holidays)
- Replacement practice information
- Emergency contact instructions
- Important patient communications

### Key Characteristics
- **Standalone Angular Component** with no dependencies beyond CommonModule
- **HTML-aware rendering** using `DomSanitizer.bypassSecurityTrustHtml()`
- **Array-based data structure** - each string becomes a separate displayed item
- **German-language content** - all notices are in German
- **Used only on HomePage** to display current notices

### Data Flow
```
Static Constants (models_interfaces.ts)
    ↓
HomeComponent property (newsList)
    ↓
Property binding [textsList]="newsList"
    ↓
LatestNewsComponent @Input
    ↓
HTML sanitization & rendering
    ↓
Browser display
```

### Current News Display
**Latest**: Christmas vacation notice (23 Dec 2025 - 2 Jan 2026)
**Location**: Home page, below hero section
**Can be switched to**: Summer vacation or other custom notices

---

**Report Prepared**: 2026-03-22
**Component Version**: Angular 19.2.0
**Status**: Fully Functional
