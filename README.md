# X-Captcha React

A modern, customizable captcha component for React applications.

## Installation

```bash
npm install @x-captcha/react
```

## Basic Usage

```jsx
import { CaptchaForm, CaptchaWidget } from '@x-captcha/react';

// Basic widget usage
const MyWidget = () => {
  return (
    <CaptchaWidget 
      apiUrl="https://api.x-captcha.com"
      onVerify={(token) => console.log("Verified with token:", token)}
      onError={(error) => console.error("Captcha error:", error)}
    />
  );
};

// Form with integrated captcha
const MyForm = () => {
  const handleSubmit = (token, event) => {
    console.log("Form submitted with token:", token);
    // Process your form submission
  };

  return (
    <CaptchaForm
      apiUrl="https://api.x-captcha.com"
      onSubmit={handleSubmit}
      submitButtonText="Submit Form"
    >
      {/* Your form fields */}
      <input type="text" name="name" placeholder="Your Name" />
      <input type="email" name="email" placeholder="Your Email" />
    </CaptchaForm>
  );
};
```

## Theming

X-Captcha React components are fully customizable through CSS variables and theming props.

### Quick Theme Example

```jsx
// Customizing colors
<CaptchaWidget 
  apiUrl="https://api.x-captcha.com"
  themeColor="#9C27B0"
  backgroundColor="#f5f5f5"
  checkmarkColor="#ffffff"
/>

// Form with custom button color
<CaptchaForm
  apiUrl="https://api.x-captcha.com"
  themeColor="#2196F3"
  buttonColor="#FF5722"
  onSubmit={handleSubmit}
/>
```

For detailed theming options, see [THEMING.md](./THEMING.md).

## Advanced Features

### Internationalization

The components automatically detect the user's language from the browser. You can also specify a language manually:

```jsx
<CaptchaWidget 
  apiUrl="https://api.x-captcha.com"
  language="fr" // French
/>
```

### Custom Dimensions

```jsx
<CaptchaWidget 
  apiUrl="https://api.x-captcha.com"
  width={400}
  height={80}
/>
```

## API Reference

### CaptchaWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | string | (required) | The URL of the captcha API |
| `themeColor` | string | "#4285F4" | Primary color for the widget |
| `backgroundColor` | string | "#fff" | Background color |
| `brandNameColor` | string | "#aaa" | Color for the brand name text |
| `checkmarkColor` | string | "#fff" | Color for the verification checkmark |
| `errorTextColor` | string | "#d32f2f" | Color for error messages |
| `height` | number\|string | 74 | Height of the captcha widget |
| `language` | string | auto | Language for the widget text (e.g., 'en', 'ru') |
| `onError` | function | - | Callback called when captcha verification fails |
| `onVerify` | function | - | Callback called when captcha is successfully verified |
| `shouldShowBrandName` | boolean | true | Whether to show the brand name in the widget |
| `tryAgainButtonBackgroundColor` | string | "#f8f8f8" | Background color for the "Try Again" button |
| `tryAgainButtonTextColor` | string | "#555" | Text color for the "Try Again" button |
| `width` | number\|string | 300 | Width of the captcha widget |

### CaptchaForm Props

CaptchaForm accepts all CaptchaWidget props, plus the following:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonColor` | string | Same as `themeColor` | Button color theme |
| `children` | React.ReactNode | - | Children elements to include in the form |
| `className` | string | "" | Additional classname for the form |
| `onSubmit` | function | (required) | Callback called when form is submitted with a valid captcha |
| `submitButtonText` | string | "Submit" | Submit button text |

## License

[MIT](./LICENSE)