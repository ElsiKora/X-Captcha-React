/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import { CaptchaForm } from "../../src";

import { ContactFormFields, LoginFormFields, RegistrationFormFields } from "./components/FormFields";
import { withContainer, withFormInteraction, withFormSubmission, withLanguage, withMockCaptchaClient, withThemeColor } from "./Decorators";

// @ts-ignore
/**
 * The CaptchaForm component provides a form with integrated CAPTCHA verification
 * to protect your applications from spam and automated submissions.
 */
const meta: Meta<typeof CaptchaForm> = {
	argTypes: {
		apiUrl: {
			control: "text",
			description: "The URL of the captcha API",
			table: {
				// eslint-disable-next-line @elsikora/sonar/no-duplicate-string
				defaultValue: { summary: "http://127.0.0.1:3000/api/captcha" },
				type: { summary: "string" },
			},
		},
		buttonColor: {
			control: "color",
			description: "Color for the submit button",
			table: {
				defaultValue: { summary: "Same as themeColor" },
				type: { summary: "string" },
			},
		},
		children: {
			control: { type: "select" },
			description: "Form fields to include inside the form",
			mapping: {
				"Contact Form": <ContactFormFields />,
				"Login Form": <LoginFormFields />,
				None: null,
				"Registration Form": <RegistrationFormFields />,
			},
			options: ["None", "Login Form", "Contact Form", "Registration Form"],
			table: {
				type: { summary: "React.ReactNode" },
			},
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
			table: {
				type: { summary: "string" },
			},
		},
		height: {
			control: { max: 500, min: 50, step: 10, type: "number" },
			description: "Height of the captcha widget in pixels",
			table: {
				// @ts-ignore
				defaultValue: { summary: 74 },
				type: { summary: "number | string" },
			},
		},
		language: {
			control: "select",
			description: "Language for form text (auto-detects if not provided)",
			options: ["en", "ru", "fr", "de", "es"],
			table: {
				defaultValue: { summary: "Auto-detected" },
				type: { summary: "string" },
			},
		},
		onSubmit: {
			action: "submitted",
			description: "Callback when form is submitted with valid captcha",
			table: {
				type: { summary: "(token: string, event: FormEvent) => void" },
			},
		},
		submitButtonText: {
			control: "text",
			description: "Text for the submit button",
			table: {
				defaultValue: { summary: "Submit" },
				type: { summary: "string" },
			},
		},
		themeColor: {
			control: "color",
			description: "Theme color for the form",
			table: {
				defaultValue: { summary: "#4285F4" },
				type: { summary: "string" },
			},
		},
		width: {
			control: { max: 800, min: 200, step: 10, type: "number" },
			description: "Width of the captcha widget in pixels",
			table: {
				// @ts-ignore
				defaultValue: { summary: 300 },
				type: { summary: "number | string" },
			},
		},
	},
	component: CaptchaForm,
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withContainer(500, "auto")],
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	title: "Components/CaptchaForm",
};

export default meta;

/**
 * Basic CaptchaForm with default configuration.
 */
export const Default: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		submitButtonText: "Submit",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("logger")],
};

/**
 * CaptchaForm with login form fields.
 */
export const LoginForm: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		children: <LoginFormFields />,
		submitButtonText: "Login",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("success"), withContainer(500, "auto")],
};

/**
 * CaptchaForm with contact form fields.
 */
export const ContactForm: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		buttonColor: "#34A853",
		children: <ContactFormFields />,
		submitButtonText: "Send Message",
		themeColor: "#34A853",
	},
	decorators: [withFormSubmission("successWithAlert"), withContainer(500, "auto")],
};

/**
 * CaptchaForm with registration form fields.
 */
export const RegistrationForm: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		children: <RegistrationFormFields />,
		submitButtonText: "Register",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("success"), withContainer(500, "auto")],
};

/**
 * CaptchaForm with a different theme color.
 */
export const CustomTheme: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		buttonColor: "#EA4335",
		children: <LoginFormFields />,
		submitButtonText: "Login",
		themeColor: "#EA4335",
	},
	decorators: [withFormSubmission("logger"), withThemeColor("#EA4335"), withContainer(500, "auto")],
};

/**
 * CaptchaForm in Russian language.
 */
export const RussianLanguage: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		children: <LoginFormFields />,
		language: "ru",
		submitButtonText: "Войти",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("logger"), withLanguage("ru"), withContainer(500, "auto")],
};

/**
 * CaptchaForm demonstrating an error response after submission.
 */
export const SubmissionError: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		children: <LoginFormFields />,
		submitButtonText: "Login",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("error"), withContainer(500, "auto")],
};

/**
 * CaptchaForm with automatic verification for demonstration purposes.
 */
export const AutoVerification: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		children: <LoginFormFields />,
		submitButtonText: "Login",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("success"), withFormInteraction({ shouldAutoVerifyCaptcha: true }), withContainer(500, "auto")],
	parameters: {
		docs: {
			description: {
				story: "This story automatically verifies the CAPTCHA after 1 second to demonstrate the verification process.",
			},
		},
	},
};

/**
 * CaptchaForm with automatic verification and submission.
 */
export const AutoSubmission: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		children: <LoginFormFields />,
		submitButtonText: "Login",
		themeColor: "#4285F4",
	},
	decorators: [withFormSubmission("successWithAlert"), withFormInteraction({ autoSubmitDelay: 1500, shouldAutoVerifyCaptcha: true }), withContainer(500, "auto")],
	parameters: {
		docs: {
			description: {
				story: "This story automatically verifies the CAPTCHA and submits the form to demonstrate the entire workflow.",
			},
		},
	},
};
