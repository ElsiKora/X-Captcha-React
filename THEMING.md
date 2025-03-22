# Theming X-Captcha React

This document explains how to customize the appearance of X-Captcha React components using CSS variables.

## Overview

X-Captcha React components use CSS variables for consistent theming across all component styles. When you customize a component's colors through props, these values are applied as CSS variables to the component container.

## Default Theme

The default theme values are defined in `src/presentation/styles/index.css`:

```css
:root {
  /* Colors */
  --x-captcha-primary: #4285f4;
  --x-captcha-error: #d32f2f;
  --x-captcha-text: #555;
  --x-captcha-text-light: #aaa;
  --x-captcha-background: #fff;
  --x-captcha-border-light: #e0e0e0;
  --x-captcha-disabled: #9e9e9e;
  --x-captcha-disabled-bg: #e0e0e0;
  
  /* Additional theme color variables */
  --x-captcha-checkmark: #fff;
  --x-captcha-btn-bg: #f8f8f8;
  --x-captcha-btn-text: var(--x-captcha-text);
  --x-captcha-btn-hover-bg: #f0f0f0;
  --x-captcha-submit-btn-bg: var(--x-captcha-primary);
  --x-captcha-submit-btn-text: #fff;
  --x-captcha-submit-btn-outline: rgb(66 133 244 / 25%);

  /* Other styling variables - see index.css for full list */
}
```

## Theming Components

### `CaptchaWidget` Component

The `CaptchaWidget` component accepts the following theme props:

```jsx
<CaptchaWidget
  // Theme props
  themeColor="#4285F4"            // Primary color for the widget
  backgroundColor="#ffffff"       // Background color
  brandNameColor="#aaaaaa"        // Color for the brand name text
  checkmarkColor="#ffffff"        // Color for the verification checkmark
  errorTextColor="#d32f2f"        // Color for error messages
  tryAgainButtonBackgroundColor="#f8f8f8" // Background color for the "Try Again" button
  tryAgainButtonTextColor="#555555" // Text color for the "Try Again" button
  
  // Other props
  apiUrl="https://api.x-captcha.com"
  width={300}
  height={74}
  // ...
/>
```

### `CaptchaForm` Component

The `CaptchaForm` component accepts these theme props:

```jsx
<CaptchaForm
  // Theme props
  themeColor="#4285F4"            // Primary color (passed to the CaptchaWidget)
  buttonColor="#4285F4"           // Color for the submit button (overrides themeColor)
  
  // Also supports all CaptchaWidget theme props
  backgroundColor="#ffffff"
  // ...
  
  // Other props
  apiUrl="https://api.x-captcha.com"
  onSubmit={handleSubmit}
  submitButtonText="Submit"
  // ...
>
  {/* Form fields */}
</CaptchaForm>
```

## CSS Variable Mapping

The following table shows how component props map to CSS variables:

| Property                       | CSS Variable                   | Default Value    |
|--------------------------------|--------------------------------|-----------------|
| `themeColor`                   | `--x-captcha-primary`          | `#4285f4`       |
| `backgroundColor`              | `--x-captcha-background`       | `#fff`          |
| `brandNameColor`               | `--x-captcha-text-light`       | `#aaa`          |
| `checkmarkColor`               | `--x-captcha-checkmark`        | `#fff`          |
| `errorTextColor`               | `--x-captcha-error`            | `#d32f2f`       |
| `tryAgainButtonBackgroundColor`| `--x-captcha-btn-bg`           | `#f8f8f8`       |
| `tryAgainButtonTextColor`      | `--x-captcha-btn-text`         | `var(--x-captcha-text)` |
| `buttonColor`                  | `--x-captcha-submit-btn-bg`    | `var(--x-captcha-primary)` |

## Advanced Theming Examples

### Dark Theme

```jsx
<CaptchaForm 
  apiUrl="https://api.x-captcha.com" 
  backgroundColor="#1E1E1E" 
  brandNameColor="#BB86FC" 
  buttonColor="#BB86FC" 
  checkmarkColor="#00E676" 
  errorTextColor="#CF6679" 
  onSubmit={handleSubmit}
  themeColor="#BB86FC" 
  tryAgainButtonBackgroundColor="#333333" 
  tryAgainButtonTextColor="#BB86FC" 
>
  {/* Form fields */}
</CaptchaForm>
```

### Brand-Specific Theme

```jsx
<CaptchaWidget 
  apiUrl="https://api.x-captcha.com" 
  themeColor="#FF5722"            // Brand primary color
  checkmarkColor="#FFF"           // White checkmark
  backgroundColor="#FBE9E7"       // Light brand color background
  brandNameColor="#BF360C"        // Dark brand color text
/>
```

## Global Theming

To apply a consistent theme across all components, you can override the CSS variables globally:

```css
:root {
  --x-captcha-primary: #9C27B0;
  --x-captcha-background: #f5f5f5;
  --x-captcha-text: #333;
  --x-captcha-text-light: #757575;
  /* Override other variables as needed */
}
```

## Testing Theme Variations

Use the `ThemeTest.stories.tsx` file in Storybook to see examples of different theming options and how they apply to the components.

To run the Storybook:

```
npm run storybook
```

Then navigate to the "Theme Tests" section to see the different theme examples.