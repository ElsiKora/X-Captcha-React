# Analysis of Existing CSS Variables and Styling Approach

---
id: doc-a5skc5-m8kl5z6t
created: 2025-03-22T19:12:23.141Z
updated: 2025-03-22T19:12:23.141Z
tags: []
---

## Content

# Analysis of Existing CSS Variables and Styling Approach

## Current CSS Variables

The application already has a set of CSS variables defined in `src/presentation/styles/index.css`:

```css
:root,
body,
html,
.x-captcha-widget,
.x-captcha-form {
  /* Colors */
  --x-captcha-primary: #4285f4;
  --x-captcha-error: #d32f2f;
  --x-captcha-text: #555;
  --x-captcha-text-light: #aaa;
  --x-captcha-background: #fff;
  --x-captcha-border-light: #e0e0e0;
  --x-captcha-disabled: #9e9e9e;
  --x-captcha-disabled-bg: #e0e0e0;

  /* Shadows, spacing, fonts, and other variables... */
}
```

## Current Inline Styling Approach

In the components, there are multiple instances where colors are applied directly in inline styles:

### CaptchaWidget Component

The CaptchaWidget component accepts several color-related props:
- `backgroundColor`
- `brandNameColor`
- `checkmarkColor`
- `errorTextColor`
- `themeColor`
- `tryAgainButtonBackgroundColor`
- `tryAgainButtonTextColor`

These are applied directly in inline styles in several places:

```jsx
// Direct inline style application examples:
style={{ backgroundColor: backgroundColor ?? "var(--x-captcha-background)" }}
style={{ color: errorTextColor ?? "var(--x-captcha-error)" }}
style={{ backgroundColor: tryAgainButtonBackgroundColor ?? "#f8f8f8" }}
style={{ color: themeColor }}
style={{ backgroundColor: themeColor, borderColor: themeColor }}
```

### CaptchaForm Component

The CaptchaForm component accepts these color-related props:
- `buttonColor`
- `themeColor` (inherited from CaptchaWidget)

The button color is set directly in inline styles:
```jsx
style={token ? { backgroundColor: actualButtonColor } : undefined}
```

## Issues with Current Approach

1. **Inconsistent Variable Usage**: Some properties use CSS variables as fallbacks (`var(--x-captcha-background)`), while others use hardcoded values (`#f8f8f8`).

2. **Inline Styles vs. CSS Variables**: Many styles are set through inline style attributes rather than being controlled through CSS variables.

3. **Lack of Complete Theming**: Not all color values are exposed through CSS variables.

4. **Dynamic Style Application**: There's no systematic way to apply user-provided styles as CSS variables.

## Properties That Need to be Converted to CSS Variables

### CaptchaWidget
- `themeColor` → `--x-captcha-primary` (already exists)
- `backgroundColor` → `--x-captcha-background` (already exists)
- `brandNameColor` → `--x-captcha-text-light` (already exists)
- `checkmarkColor` → Needs new variable: `--x-captcha-checkmark`
- `errorTextColor` → `--x-captcha-error` (already exists)
- `tryAgainButtonBackgroundColor` → Needs new variable: `--x-captcha-btn-bg`
- `tryAgainButtonTextColor` → Needs new variable: `--x-captcha-btn-text`

### CaptchaForm
- `buttonColor` → Needs new variable: `--x-captcha-submit-btn-bg`

## Proposed Approach

1. **Add Missing CSS Variables**: Define new CSS variables in index.css for all theming options.

2. **Create Utility Function**: Develop a utility function that dynamically applies user-provided colors as CSS variables to a container element.

3. **Replace Inline Styles**: Update the components to use CSS variables instead of direct inline styles.

4. **Dynamic Styling**: Apply user-provided styles as CSS custom properties to component containers.

This approach will ensure that:
- All styling is consistent and controlled through CSS variables
- User customizations are properly applied via CSS variables
- No hardcoded values remain in the components
