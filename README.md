<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/x-captcha-react-9FGCSakCTJlF8MOGnkzZi9mnikQC5f.png" width="500" alt="project-logo">
</p>

<h1 align="center">X-Captcha-React 🛡️</h1>
<p align="center"><em>Elegant React components for X-Captcha integration</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/version-blue.svg?style=for-the-badge&logo=react&logoColor=white" alt="version"> <img src="https://img.shields.io/badge/npm-red.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"> <img src="https://img.shields.io/badge/license-green.svg?style=for-the-badge&logo=license&logoColor=white" alt="license"> <img src="https://img.shields.io/badge/typescript-blue.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"> <img src="https://img.shields.io/badge/react-blue.svg?style=for-the-badge&logo=react&logoColor=white" alt="react"> <img src="https://img.shields.io/badge/rollup-orange.svg?style=for-the-badge&logo=rollup.js&logoColor=white" alt="rollup">
</p>


## 📚 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [License](#-license)


## 📖 Description
X-Captcha-React provides a set of modern, customizable React components that make integrating X-Captcha verification into your applications simple and effective. This library bridges your React application with X-Captcha's security services, offering user-friendly CAPTCHA challenges that help protect your forms against bot submissions while maintaining an excellent user experience. With support for multiple languages, extensive theming options, and various integration methods, X-Captcha-React is perfect for developers looking to add robust security layers to their forms with minimal effort. It's built with TypeScript, offering type safety and excellent developer experience while ensuring your users get a smooth verification flow.

## 🚀 Features
- ✨ **🌍 Multi-language support with auto-detection (English and Russian included)**
- ✨ **🎨 Extensive theming options with customizable colors, sizes, and styles**
- ✨ **⚡ Optimized performance with minimal dependencies**
- ✨ **🔄 Smooth animations and transitions for enhanced user experience**
- ✨ **📱 Responsive design that works across all device sizes**
- ✨ **🧩 Simple integration with existing forms or as standalone components**
- ✨ **⚙️ Dual module formats (ESM and CommonJS) for maximum compatibility**
- ✨ **🔒 Secure CAPTCHA verification to protect against automated bots**
- ✨ **🛠️ TypeScript support with comprehensive type definitions**
- ✨ **🔍 Accessibility-focused design for inclusive user experience**

## 🛠 Installation
```bash
# Using npm
npm install @elsikora/x-captcha-react

# Using yarn
yarn add @elsikora/x-captcha-react

# Using pnpm
pnpm add @elsikora/x-captcha-react
```

## 💡 Usage
## Basic Usage

The simplest way to add CAPTCHA to your form is using the `CaptchaForm` component:

```jsx
import { CaptchaForm } from '@elsikora/x-captcha-react';
import React from 'react';

const SimpleForm = () => {
  const handleSubmit = (token, event) => {
    console.log('Form submitted with token:', token);
    // Submit form data with the token to your backend
  };

  return (
    <CaptchaForm 
      apiUrl="https://your-x-captcha-server.com/api" 
      onSubmit={handleSubmit}
      submitButtonText="Send Message"
    >
      <input type="text" name="name" placeholder="Your Name" />
      <textarea name="message" placeholder="Your Message"></textarea>
    </CaptchaForm>
  );
};
```

## Advanced Usage with Context Provider

For more complex applications, you can use the `CaptchaProvider` at a higher level in your component tree:

```jsx
import { CaptchaProvider, CaptchaWidget } from '@elsikora/x-captcha-react';
import React, { useState } from 'react';

const App = () => {
  return (
    <CaptchaProvider apiUrl="https://your-x-captcha-server.com/api">
      <MyForm />
    </CaptchaProvider>
  );
};

const MyForm = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  
  const handleVerify = (token) => {
    setToken(token);
    setError(null);
  };
  
  const handleError = (errorMessage) => {
    setToken(null);
    setError(errorMessage);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please complete the captcha before submitting');
      return;
    }
    
    // Your submission logic here
    console.log('Form submitted with token:', token);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />
      <CaptchaWidget 
        onVerify={handleVerify} 
        onError={handleError} 
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!token}>Submit</button>
    </form>
  );
};
```

## Customizing Theme and Appearance

X-Captcha-React offers extensive theming options:

```jsx
import { CaptchaWidget } from '@elsikora/x-captcha-react';
import React from 'react';

const ThemedCaptcha = () => {
  return (
    <CaptchaWidget 
      apiUrl="https://your-x-captcha-server.com/api"
      // Core theme color (used for spinner, animations, etc)
      themeColor="#6200ea" 
      // Background of the widget
      backgroundColor="#f5f5f5" 
      // Text color for the brand name
      brandNameColor="#555555" 
      // Color for the checkmark when verified
      checkmarkColor="#00c853" 
      // Color for error messages
      errorTextColor="#d50000" 
      // Button styling
      tryAgainButtonBackgroundColor="#eeeeee"
      tryAgainButtonTextColor="#212121"
      // Size customization
      width={320}
      height={80}
      // Language setting ("en" or "ru")
      language="en"
      // Hide the brand name if needed
      shouldShowBrandName={true}
      onVerify={(token) => console.log('Verified with token:', token)}
      onError={(error) => console.error('Captcha error:', error)}
    />
  );
};
```

## Internationalization (i18n)

X-Captcha-React supports multiple languages with automatic detection:

```jsx
import { CaptchaForm } from '@elsikora/x-captcha-react';
import React from 'react';

const LocalizedForm = () => {
  return (
    <CaptchaForm 
      apiUrl="https://your-x-captcha-server.com/api"
      // Explicitly set language to Russian
      language="ru"
      onSubmit={(token, event) => {
        console.log('Form submitted with token:', token);
      }}
    >
      <input type="email" placeholder="Электронная почта" />
    </CaptchaForm>
  );
};
```

## TypeScript Usage

The library includes comprehensive TypeScript definitions:

```tsx
import { CaptchaWidget, ICaptchaWidgetProperties } from '@elsikora/x-captcha-react';
import React, { FC } from 'react';

interface Props {
  formId: string;
}

const CaptchaComponent: FC<Props> = ({ formId }) => {
  // Type-safe properties
  const captchaProps: ICaptchaWidgetProperties = {
    apiUrl: 'https://your-x-captcha-server.com/api',
    themeColor: '#1976d2',
    onVerify: (token: string) => {
      console.log(`Form ${formId} verified with token:`, token);
    },
    onError: (error: string) => {
      console.error(`Form ${formId} captcha error:`, error);
    }
  };

  return <CaptchaWidget {...captchaProps} />;
};
```

## Integration with Form Libraries

### With React Hook Form

```jsx
import { CaptchaWidget } from '@elsikora/x-captcha-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const HookFormExample = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const [captchaToken, setCaptchaToken] = React.useState(null);
  const [captchaError, setCaptchaError] = React.useState(null);
  
  const onSubmit = (data) => {
    if (!captchaToken) {
      setCaptchaError('Please complete the captcha verification');
      return;
    }
    
    // Include the captcha token with your form data
    const formData = {
      ...data,
      captchaToken
    };
    
    console.log('Submitting form with data:', formData);
    // Your API submission logic here
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email is required' })} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      
      <CaptchaWidget 
        apiUrl="https://your-x-captcha-server.com/api"
        onVerify={(token) => {
          setCaptchaToken(token);
          setCaptchaError(null);
        }}
        onError={(error) => {
          setCaptchaToken(null);
          setCaptchaError(error);
        }}
      />
      {captchaError && <p className="error">{captchaError}</p>}
      
      <button type="submit" disabled={isSubmitting || !captchaToken}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

## 🛣 Roadmap
| Task / Feature | Status |
|---------------|--------|
| ## Future Development Plans | 🚧 In Progress |
| - Add support for more languages | 🚧 In Progress |
| - Create advanced CAPTCHA challenge types | 🚧 In Progress |
| - Develop improved accessibility features | 🚧 In Progress |
| - Add support for server-side rendering (SSR) with Next.js | 🚧 In Progress |
| - Implement more integrations with popular form libraries | 🚧 In Progress |
| - Add analytics features to monitor CAPTCHA performance | 🚧 In Progress |
| - Build a development toolkit for testing CAPTCHA in local environments | 🚧 In Progress |
| - Create a React Native version for mobile applications | 🚧 In Progress |
| (done) 🌍 Multi-language support with auto-detection (English and Russian included) | 🚧 In Progress |
| (done) 🎨 Extensive theming options with customizable colors, sizes, and styles | 🚧 In Progress |
| (done) ⚡ Optimized performance with minimal dependencies | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### What is X-Captcha?
X-Captcha is a CAPTCHA service that helps protect your web forms and applications from spam and abuse by verifying that users are human rather than bots.

### How does X-Captcha-React differ from other CAPTCHA solutions?
X-Captcha-React is specifically designed for React applications, providing seamless integration with React components and hooks. It offers extensive customization options and a developer-friendly experience with TypeScript support.

### Is X-Captcha-React accessible?
Yes, we've designed the components with accessibility in mind, ensuring they work well with screen readers and keyboard navigation.

### Can I customize the look and feel of the CAPTCHA widget?
Absolutely! X-Captcha-React provides extensive theming options allowing you to customize colors, sizes, and even some behavior aspects to match your application's design.

### Does X-Captcha-React support multiple languages?
Yes, the library currently supports English and Russian with automatic detection based on the user's browser settings. You can also manually specify the language.

### How do I verify the CAPTCHA token on my server?
After a user completes the CAPTCHA, you'll receive a token that should be sent to your server along with the form data. Your server should then verify this token with the X-Captcha API to confirm it's valid.

### Does X-Captcha-React work with server-side rendering (SSR)?
The library is primarily designed for client-side rendering. For SSR applications like Next.js, you'll need to ensure the CAPTCHA components are only rendered on the client side.

### Can I use X-Captcha-React with form libraries like Formik or React Hook Form?
Yes, the library is designed to work seamlessly with popular form libraries. Examples are provided in the documentation.

## 🔒 License
This project is licensed under **MIT License

Copyright (c) 2025 ElsiKora

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**.
