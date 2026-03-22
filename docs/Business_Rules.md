# Business Rules & Frontend Validation

## Overview

This document outlines the business logic, validation rules, and workflows implemented on the frontend for the Hausarzt Cottbus medical practice website.

## Contact Form Validation

### Input Fields

The contact form typically includes:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Phone**: Optional, but if provided must be valid format
- **Subject**: Required, minimum 5 characters
- **Message**: Required, minimum 10 characters

### Validation Rules

#### Name Field
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Pattern**: Letters, spaces, hyphens allowed
- **Error Message**: "Please enter a valid name (2-50 characters)"

#### Email Field
- **Required**: Yes
- **Format**: Valid email address (RFC 5322 pattern)
- **Max Length**: 100 characters
- **Error Message**: "Please enter a valid email address"

#### Phone Field
- **Required**: No
- **Format**: Valid phone number (+ followed by digits and dashes)
- **Pattern**: `^\+?[\d\s\-()]+$`
- **Min Length**: 7 characters
- **Error Message**: "Please enter a valid phone number"

#### Subject Field
- **Required**: Yes
- **Min Length**: 5 characters
- **Max Length**: 100 characters
- **Error Message**: "Subject must be 5-100 characters"

#### Message Field
- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 5000 characters
- **Error Message**: "Message must be 10-5000 characters"

### Submission Workflow

1. **Validation Check**: All fields validated before submission
2. **Loading State**: Submit button disabled with loading indicator
3. **API Call**: Form data sent to backend service
4. **Success Response**:
   - Confirmation message displayed
   - Form reset to empty state
   - Redirect or success toast notification
5. **Error Response**:
   - Error message displayed
   - Form data preserved for user correction
   - Specific error details shown if available

### Error Handling

- **Validation Errors**: Shown below each field as user types
- **Submission Errors**: Displayed as toast or alert modal
- **Network Errors**: Retry mechanism with user notification
- **Server Errors**: Generic error message to user, details logged

## Appointment/Request Validation

If appointment booking exists:

### Date/Time Validation
- **Minimum Date**: Today or tomorrow (depending on practice hours)
- **Maximum Date**: 90 days in advance
- **Valid Hours**: Practice operating hours only
- **Blocked Dates**: Holidays and days off

### Service Selection
- **Required**: Yes
- **Options**: Dynamically loaded from backend
- **Error**: "Please select a service"

## Navigation & Routing

### Active Route Highlighting

**HeaderComponent** uses `ScrollTrackerService` to highlight active navigation:
- Tracks scroll position on page
- Identifies which section user is viewing
- Highlights corresponding nav link
- Updates as user scrolls

### Route Guards (Future Implementation)

Recommended guards:
- `CanActivate`: Prevent direct access to admin routes
- `CanDeactivate`: Warn user before leaving unsaved form

### Link Validation

All internal links validated:
- Links point to existing routes
- External links open in new tab with `rel="noopener noreferrer"`
- Hash links scroll to element smoothly with offset for header

## Form State Management

### Form States

1. **Pristine**: Form not modified, no errors shown
2. **Dirty**: Form has been modified by user
3. **Touched**: Form field has been focused and blurred
4. **Valid**: All validations pass
5. **Invalid**: One or more validation errors
6. **Pending**: Async validation in progress
7. **Submitted**: Form submission attempted
8. **Submitting**: Form data being sent to backend

### State Behavior

- **Show Errors Only If**:
  - Field is dirty/touched, AND
  - Field has validation errors, OR
  - Form has been submitted

- **Disable Submit Button When**:
  - Form is invalid, OR
  - Form is currently submitting

## Content Management Rules

### News/Updates Display

**Sorting**: By date, newest first

**Filtering**:
- By category/tag (if applicable)
- By date range (optional)

**Display Limits**:
- Homepage: Latest 3-5 news items
- News page: All items with pagination (10 per page)

### Team Member Display

**Sorting**:
- Primary: By title/role (Doctor, Assistant, etc.)
- Secondary: By name alphabetically

**Filtering**:
- By specialty (if applicable)
- By availability (if applicable)

**Required Fields**:
- Name
- Title/Position
- Photo
- Contact information

### Services Display

**Sorting**:
- By importance/frequency
- By category

**Categories**:
- General Medicine
- Dermatology
- Preventive Care
- Other Specialties

## Security Rules

### Input Sanitization

- **XSS Prevention**: All user input sanitized before display
- **HTML Escaping**: Dynamic content escaped by default
- **No Inline Scripts**: No user input treated as HTML/JavaScript

### GDPR & Privacy

- **Cookie Consent**: Displayed on first visit
- **Data Collection**: Only necessary data collected
- **User Rights**: Privacy policy available, contact form notice included
- **Retention**: Data handled per privacy policy

### Contact Form Privacy

- **GDPR Notice**: Users notified data will be processed
- **Consent**: Checkbox for consent to contact (if required by law)
- **Data Handling**: Backend email service only, no third-party APIs

## Business Hours & Availability

### Display Rules

**Opening Hours**:
- Displayed in consistent format across site
- Shows current day/time status (open/closed)
- Color indicators: Green (open), Red (closed)

**Appointment Availability**:
- Only show future dates within operating hours
- Block out holidays/closed days
- Show estimated response time for inquiries

### Auto-Response Messages

**Contact Form Submission**:
- Immediate confirmation to user
- Estimated response timeframe (e.g., "We'll respond within 24 hours")
- Message adjusted for after-hours submissions

## Accessibility & UX Rules

### Language & Content

- **German Primary**: Content primarily in German
- **English Support**: Key pages may have English version
- **Clear Language**: Use simple, patient-friendly language
- **Medical Terminology**: Explain complex terms or use common alternatives

### Responsive Behavior

**Mobile (< 576px)**:
- Single column layout
- Larger touch targets (44x44px minimum)
- Simplified navigation
- Hidden by default: Non-essential content

**Tablet (576px - 991px)**:
- Two column layout where applicable
- Optimized for portrait/landscape
- Touch-friendly interactive elements

**Desktop (≥ 992px)**:
- Multi-column layouts
- Full feature set
- Hover states and tooltips
- Keyboard navigation

### Keyboard Navigation

All interactive elements keyboard accessible:
- Tab order logical
- Focus visible on all focusable elements
- Enter/Space activate buttons
- Escape closes modals/dropdowns
- Arrow keys navigate menus

## Search Engine Optimization

### Meta Information

- **Page Titles**: Unique, descriptive (50-60 chars)
- **Meta Descriptions**: Compelling summary (150-160 chars)
- **Canonical URLs**: Prevent duplicate content
- **Open Graph**: Social media previews optimized

### Structured Data

**Schema.org Markup**:
- Local Business schema for practice info
- Medical Business type (Doctor/Practice)
- Contact information
- Opening hours
- Address

### URL Structure

- **Format**: `/section/page` (e.g., `/team/members`)
- **Hyphens**: Use hyphens, not underscores
- **Lowercase**: All lowercase URLs
- **Trailing Slash**: Consistent across site

## Performance Rules

### Image Optimization

- **Formats**: WebP with JPEG fallback for photos
- **Sizing**: Appropriately sized for container
- **Lazy Loading**: Images below fold lazy-loaded
- **Compression**: Compressed without visible quality loss

### Asset Loading

- **Critical CSS**: Inline critical CSS
- **Deferred JS**: Non-critical JS deferred
- **Preloading**: Preload critical resources
- **Minification**: All assets minified in production

### Caching

- **Browser Cache**: Long cache expiration for versioned assets
- **CDN Cache**: Static assets cached on CDN if applicable
- **Service Worker**: Future: offline support and caching strategy

## Error Handling Workflows

### 404 Not Found

- **User Experience**:
  - Friendly error message
  - Suggest navigation to home or main sections
  - Search functionality
  - Contact option

### 500 Server Error

- **User Experience**:
  - Apologetic message
  - "Try again" button
  - Report issue option
  - Alternative contact method

### Network/Connection Error

- **User Experience**:
  - "Check your connection" message
  - Offline indication (if offline)
  - Retry button
  - Fallback content if available

## Future Business Rules

### Appointment Booking (When Implemented)

- Calendar availability management
- Automated confirmations and reminders
- Cancellation policies
- No-show handling

### Newsletter Signup

- Email validation
- Double opt-in (confirmation email)
- Spam prevention (CAPTCHA)
- Unsubscribe links

### Patient Portal (Future)

- Secure login
- Appointment history
- Medical records access
- Prescription management
- Messaging with practice
