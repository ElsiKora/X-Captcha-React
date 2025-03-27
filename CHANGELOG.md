# [2.0.0](https://github.com/ElsiKora/X-Captcha-React/compare/v1.1.0...v2.0.0) (2025-03-27)


### Features

* **captcha:** add proof of work challenge type and solver implementation ([fdc2c59](https://github.com/ElsiKora/X-Captcha-React/commit/fdc2c59285835111f39aa9ba38135267784a467f))
* **captcha:** require publickey for components and centralize constants ([5a1da90](https://github.com/ElsiKora/X-Captcha-React/commit/5a1da90b6f2d68df7fc8d81c5135004abd4caf3d))


### BREAKING CHANGES

* **captcha:** Components now require a publicKey prop to function properly. The previous
implementation without a public key will not work with the new version.

This commit implements the public key requirement for captcha components and refactors the
codebase to use centralized constants. Updates include:

- Added required publicKey prop to CaptchaWidget, CaptchaForm and CaptchaProvider
- Added error handling for missing public key
- Created Constants.ts file to centralize all configuration values
- Updated all translations with new messaging for missing public keys
- Refactored Storybook stories to use centralized constants
- Modified CaptchaClient implementation to work with the new API requirements
- Updated interfaces to reflect new required properties.

# [1.1.0](https://github.com/ElsiKora/X-Captcha-React/compare/v1.0.0...v1.1.0) (2025-03-22)


### Features

* **i18n:** add support for multiple languages ([898f409](https://github.com/ElsiKora/X-Captcha-React/commit/898f409523d5ee1beb838d08ebefd1d92cddc7c1))

# 1.0.0 (2025-03-22)


### Features

* **captchawidget:** add extensive theming options and improve ui interactions ([1af1c29](https://github.com/ElsiKora/X-Captcha-React/commit/1af1c29627e6990e433e6044ce2853d12707fc05))
* **i18n:** add i18next support and update dependencies ([2a08d0b](https://github.com/ElsiKora/X-Captcha-React/commit/2a08d0bb4be6602750ca5ebe3f93998f850583de))
* **storybook:** integrate storybook for component visualization and documentation ([8f71ef2](https://github.com/ElsiKora/X-Captcha-React/commit/8f71ef2e978ab75711e780744a51fab319517736))
