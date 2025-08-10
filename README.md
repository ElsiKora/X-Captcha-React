<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/x-captcha-react-9FGCSakCTJlF8MOGnkzZi9mnikQC5f.png" width="500" alt="project-logo">
</p>

<h1 align="center">X-Captcha-React 🛡️</h1>
<p align="center"><em>Modern, customizable React components for the X-Captcha service</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/npm-blue.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"> <img src="https://img.shields.io/badge/version-green.svg?style=for-the-badge&logo=semver&logoColor=white" alt="version"> <img src="https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white" alt="react"> <img src="https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"> <img src="https://img.shields.io/badge/license-yellow.svg?style=for-the-badge&logo=license&logoColor=white" alt="license">
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
X-Captcha-React provides elegant, fully customizable React components for integrating X-Captcha verification services into your web applications. With support for multiple challenge types (including Proof of Work and Click verification), extensive internationalization (30+ languages), and complete theming capabilities, X-Captcha-React makes it simple to protect your forms from bots while maintaining a seamless user experience. Whether you're building a login form, registration page, or contact form, X-Captcha-React offers the perfect balance between security and usability.

## 🚀 Features
- ✨ **Multiple challenge types support (Proof of Work and Click verification)**
- ✨ **Comprehensive internationalization with 30+ languages out-of-the-box**
- ✨ **Complete theming with unified theme object for all visual customizations**
- ✨ **Advanced customization for retry buttons, submit buttons, spinners, and more**
- ✨ **Accessible design with keyboard navigation and screen reader support**
- ✨ **Form integration with built-in validation and error handling**
- ✨ **Optimized Web Worker implementation for Proof of Work challenges**
- ✨ **Lightweight footprint with minimal dependencies**
- ✨ **TypeScript support with comprehensive type definitions**
- ✨ **Server-side rendering compatible**
- ✨ **Responsive design that works across all device sizes**

## 🛠 Installation
```bash
# Using npm
npm install @elsikora/x-captcha-react

# Using yarn
yarn add @elsikora/x-captcha-react

# Using pnpm
pnpm add @elsikora/x-captcha-react

# Using bun
bun add @elsikora/x-captcha-react
```

## 💡 Usage
## Basic Usage

The simplest way to use X-Captcha-React is with the `CaptchaWidget` component:

```tsx
import { CaptchaWidget } from '@elsikora/x-captcha-react';
import React from 'react';

function MyForm() {
  const handleVerify = (token: string) => {
    console.log('Verification successful!', token);
    // Send the token to your server for validation
  };

  const handleError = (error: string) => {
    console.error('Verification failed:', error);
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <CaptchaWidget
        apiUrl="https://api.x-captcha.com"
        publicKey="your-public-key"
        challengeType="click"
        onVerify={handleVerify}
        onError={handleError}
      />
    </div>
  );
}
```

## Complete Form Integration

For a more complete solution, use the `CaptchaForm` component which includes the widget and form handling:

```tsx
import { CaptchaForm } from '@elsikora/x-captcha-react';
import React, { FormEvent } from 'react';

function ContactForm() {
  const handleSubmit = (token: string, event: FormEvent) => {
    // Access form data
    const formData = new FormData(event.target as HTMLFormElement);
    
    // Submit to your server with the captcha token
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        captchaToken: token
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <CaptchaForm
      apiUrl="https://api.x-captcha.com"
      publicKey="your-public-key"
      challengeType="click"
      onSubmit={handleSubmit}
      submitButtonText="Send Message"
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required></textarea>
      </div>
    </CaptchaForm>
  );
}
```

## Using the CaptchaProvider

For applications that use captcha in multiple places, use the `CaptchaProvider`:

```tsx
import { CaptchaProvider, CaptchaWidget } from '@elsikora/x-captcha-react';
import React from 'react';

function App() {
  return (
    <CaptchaProvider
      apiUrl="https://api.x-captcha.com"
      publicKey="your-public-key"
    >
      <div className="app-container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </CaptchaProvider>
  );
}

// Then in your components:
function LoginForm() {
  const handleVerify = (token: string) => {
    // Handle verification
  };
  
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <CaptchaWidget
        challengeType="pow"
        onVerify={handleVerify}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Customizing the Theme

X-Captcha-React offers extensive theming options through a comprehensive `theme` object:

```tsx
import { CaptchaWidget } from '@elsikora/x-captcha-react';
import React from 'react';

function CustomThemedCaptcha() {
  return (
    <CaptchaWidget
      apiUrl="https://api.x-captcha.com"
      publicKey="your-public-key"
      challengeType="click"
      
      // Complete theme customization
      theme={{
        colors: {
          primary: "#6200EA",           // Main theme color
          background: "#F5F5F5",        // Widget background
          text: "#212121",              // Main text color
          textLight: "#757575",         // Secondary text/brand name
          error: "#D50000",             // Error messages
          border: "#E0E0E0",            // Borders
          disabled: "#9E9E9E",          // Disabled state text
          disabledBackground: "#F5F5F5" // Disabled state background
        },
        checkbox: {
          checkmarkColor: "#00C853",    // Verified checkmark
          borderColor: "#6200EA",       // Checkbox border
          size: "24px",                 // Checkbox size
          borderRadius: "4px"           // Checkbox corners
        },
        retryButton: {
          backgroundColor: "#E0E0E0",   // Retry button background
          textColor: "#424242",         // Retry button text
          hoverBackgroundColor: "#D0D0D0", // Hover state
          iconColor: "#616161",         // Icon color
          borderColor: "#BDBDBD",       // Button border
          borderRadius: "6px"           // Button corners
        },
        submitButton: {
          backgroundColor: "#6200EA",   // Submit button background
          textColor: "#FFFFFF",         // Submit button text
          hoverBackgroundColor: "#5300D5", // Hover state
          disabledBackgroundColor: "#E0E0E0", // Disabled state
          disabledTextColor: "#9E9E9E" // Disabled text
        },
        spinner: {
          color: "#6200EA",             // Loading spinner color
          size: "20px",                 // Spinner size
          borderWidth: "2px"            // Spinner thickness
        },
        typography: {
          fontFamily: "Inter, sans-serif", // Font family
          fontSizeXs: "10px",           // Extra small text
          fontSizeSm: "14px",           // Small text
          fontSizeMd: "15px"            // Medium text
        },
        effects: {
          shadowSm: "0 1px 3px rgba(0,0,0,0.08)",
          shadow: "0 4px 6px rgba(0,0,0,0.1)",
          shadowLg: "0 6px 12px rgba(0,0,0,0.15)",
          transitionFast: "0.2s",
          transitionNormal: "0.3s"
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          normal: "10px",
          md: "16px",
          lg: "24px"
        },
        borderRadius: {
          sm: "4px",
          normal: "6px",
          lg: "8px"
        }
      }}
      
      // Size customization
      width={320}
      height={80}
    />
  );
}
```

### Simple Theme Example

For basic customization, you can provide just the properties you want to change:

```tsx
<CaptchaWidget
  apiUrl="https://api.x-captcha.com"
  publicKey="your-public-key"
  challengeType="click"
  theme={{
    colors: {
      primary: "#FF5722",  // Orange theme
      background: "#FFF3E0"
    },
    retryButton: {
      backgroundColor: "#FFE0B2",
      textColor: "#E65100"
    }
  }}
/>
```

## Language Customization

X-Captcha-React supports 30+ languages with automatic detection:

```tsx
import { CaptchaWidget } from '@elsikora/x-captcha-react';
import React from 'react';

function MultiLanguageCaptcha() {
  return (
    <div>
      {/* Will auto-detect the user's browser language */}
      <CaptchaWidget
        apiUrl="https://api.x-captcha.com"
        publicKey="your-public-key"
        challengeType="click"
      />
      
      {/* Or specify a language */}
      <CaptchaWidget
        apiUrl="https://api.x-captcha.com"
        publicKey="your-public-key"
        challengeType="click"
        language="fr"
      />
    </div>
  );
}
```

## Advanced: Proof of Work Configuration

For Proof of Work challenges, you can customize the solver:

```tsx
import { CaptchaWidget } from '@elsikora/x-captcha-react';
import { EChallengeType } from '@elsikora/x-captcha-react';
import React from 'react';

function AdvancedPowCaptcha() {
  return (
    <CaptchaWidget
      apiUrl="https://api.x-captcha.com"
      publicKey="your-public-key"
      challengeType={EChallengeType.POW}
      powSolver={{
        batchSize: 2000,        // Number of attempts per batch
        maxAttempts: 2000000,   // Maximum number of attempts
        workerTimeout: 60000    // Timeout in milliseconds
      }}
    />
  );
}
```

## TypeScript Support

X-Captcha-React is written in TypeScript and exports all necessary types:

```tsx
import type { 
  ICaptchaWidgetProperties,
  ICaptchaFormProperties,
  ICaptchaTheme,
  EChallengeType
} from '@elsikora/x-captcha-react';

// Use the types for better type safety
const customTheme: ICaptchaTheme = {
  colors: {
    primary: "#2196F3",
    background: "#FFFFFF",
    error: "#F44336"
  },
  retryButton: {
    backgroundColor: "#E3F2FD",
    textColor: "#1976D2",
    hoverBackgroundColor: "#BBDEFB"
  }
};

const widgetProps: ICaptchaWidgetProperties = {
  apiUrl: "https://api.x-captcha.com",
  publicKey: "your-public-key",
  challengeType: EChallengeType.CLICK,
  theme: customTheme,
  onVerify: (token: string) => console.log(token)
};
```

## 🛣 Roadmap
| Task / Feature | Status |
|-----------------|--------|
| Core Captcha Widget Component | ✅ Done |
| Captcha Form Integration | ✅ Done |
| Proof of Work Challenge Support | ✅ Done |
| Click Challenge Support | ✅ Done |
| Multi-language Support (30+ languages) | ✅ Done |
| Comprehensive Theming Options | ✅ Done |
| Web Worker Optimization | ✅ Done |
| Form Validation and Error Handling | ✅ Done |
| React Context Provider | ✅ Done |
| TypeScript Type Definitions | ✅ Done |
| Advanced Visual Customization (Unified Theme API) | ✅ Done |
| Advanced Animation & Transitions | 🚧 In Progress |
| Documentation Website | 🚧 In Progress |
| Code Splitting for Smaller Bundle Size | 🚧 In Progress |
| More Challenge Types Support | 🚧 In Progress |
| Accessibility Improvements (ARIA) | 🚧 In Progress |
| Server-Side Rendering Optimization | 🚧 In Progress |
| Performance Benchmarking & Optimization | 🚧 In Progress |
| React Native Support | 🚧 In Progress |
| Interactive Component Playground | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### What is X-Captcha?
X-Captcha is a modern CAPTCHA service designed to protect web applications from bots and automated abuse while providing a user-friendly experience. This React library provides components to easily integrate X-Captcha into React applications.

### How does the Proof of Work challenge work?
The Proof of Work challenge requires the client's browser to perform computational work before submitting a form. This approach is privacy-friendly (no tracking) and effectively prevents automated submissions while being unobtrusive to real users.

### Is X-Captcha-React accessible?
Yes, X-Captcha-React is designed with accessibility in mind. It supports keyboard navigation, has appropriate ARIA attributes, and includes clear visual cues for various states.

### Can I use X-Captcha-React with Next.js?
Yes, X-Captcha-React is compatible with Next.js applications, including those using the App Router. Just be mindful of client-side vs. server-side rendering considerations.

### What languages are supported?
X-Captcha-React supports over 30 languages out of the box, including English, Spanish, French, German, Russian, Chinese, Japanese, Arabic, and many more. The language can be automatically detected from the user's browser settings or explicitly specified.

### How do I verify the captcha token on my server?
After a user completes the captcha, your application receives a token. You should send this token to your backend for validation using the X-Captcha verification API before processing the form submission.

## 🔒 License
This project is licensed under **MIT License

Copyright (c) 2025 ElsiKora

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**.
