import type { Meta, StoryObj } from "@storybook/react-vite";

import React from "react";
import { fn } from "storybook/test";

import { CaptchaForm } from "../../src";

import { ContactFormFields, LoginFormFields, RegistrationFormFields } from "./components/FormFields";
import { CONTAINER_SIZES, DEFAULT_API_URL, DEFAULT_PUBLIC_KEY, SUBMIT_BUTTON_TEXT, SUPPORTED_LANGUAGES, THEME_COLORS, WIDGET_DIMENSIONS } from "./Constants";
import { withContainer, withFormInteraction, withFormSubmission, withLanguage, withMockCaptchaClient, withThemeColor } from "./Decorators";

// @ts-ignore
/**
 * The CaptchaForm component provides a form with integrated CAPTCHA verification
 * to protect your applications from spam and automated submissions.
 */
const meta: Meta<typeof CaptchaForm> = {
	args: {
		publicKey: DEFAULT_PUBLIC_KEY,
	},
	argTypes: {
		apiUrl: {
			control: "text",
			description: "The URL of the captcha API",
			table: {
				defaultValue: { summary: DEFAULT_API_URL },
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
				defaultValue: { summary: WIDGET_DIMENSIONS.DEFAULT_HEIGHT },
				type: { summary: "number | string" },
			},
		},
		language: {
			control: "select",
			description: "Language for form text (auto-detects if not provided)",
			options: SUPPORTED_LANGUAGES,
			table: {
				defaultValue: { summary: "Auto-detected" },
				type: { summary: "string" },
			},
		},
		onSubmit: {
			description: "Callback when form is submitted with valid captcha",
			table: {
				type: { summary: "(token: string, event: FormEvent) => void" },
			},
		},
		publicKey: {
			control: "text",
			description: "The public key for the captcha API",
			table: {
				type: { summary: "string" },
			},
		},
		submitButtonText: {
			control: "text",
			description: "Text for the submit button",
			table: {
				defaultValue: { summary: SUBMIT_BUTTON_TEXT.DEFAULT },
				type: { summary: "string" },
			},
		},
		themeColor: {
			control: "color",
			description: "Theme color for the form",
			table: {
				defaultValue: { summary: THEME_COLORS.BLUE },
				type: { summary: "string" },
			},
		},
		width: {
			control: { max: 800, min: 200, step: 10, type: "number" },
			description: "Width of the captcha widget in pixels",
			table: {
				// @ts-ignore
				defaultValue: { summary: WIDGET_DIMENSIONS.DEFAULT_WIDTH },
				type: { summary: "number | string" },
			},
		},
	},
	component: CaptchaForm,
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
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
		apiUrl: DEFAULT_API_URL,
		onSubmit: fn(),
		submitButtonText: SUBMIT_BUTTON_TEXT.DEFAULT,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("logger")],
};

/**
 * CaptchaForm with login form fields.
 */
export const LoginForm: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		children: <LoginFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.LOGIN,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("success"), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
};

/**
 * CaptchaForm with contact form fields.
 */
export const ContactForm: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		buttonColor: THEME_COLORS.GREEN,
		children: <ContactFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.CONTACT,
		themeColor: THEME_COLORS.GREEN,
	},
	decorators: [withFormSubmission("successWithAlert"), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
};

/**
 * CaptchaForm with registration form fields.
 */
export const RegistrationForm: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		children: <RegistrationFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.REGISTER,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("success"), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
};

/**
 * CaptchaForm with a different theme color.
 */
export const CustomTheme: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		buttonColor: THEME_COLORS.RED,
		children: <LoginFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.LOGIN,
		themeColor: THEME_COLORS.RED,
	},
	decorators: [withFormSubmission("logger"), withThemeColor(THEME_COLORS.RED), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
};

/**
 * CaptchaForm in Russian language.
 */
export const RussianLanguage: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		children: <LoginFormFields />,
		language: "ru",
		submitButtonText: SUBMIT_BUTTON_TEXT.LOGIN_RU,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("logger"), withLanguage("ru"), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
};

/**
 * CaptchaForm demonstrating an error response after submission.
 */
export const SubmissionError: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		children: <LoginFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.LOGIN,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("error"), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
};

/**
 * CaptchaForm with automatic verification for demonstration purposes.
 */
export const AutoVerification: StoryObj<typeof CaptchaForm> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		children: <LoginFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.LOGIN,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("success"), withFormInteraction({ shouldAutoVerifyCaptcha: true }), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
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
		apiUrl: DEFAULT_API_URL,
		children: <LoginFormFields />,
		submitButtonText: SUBMIT_BUTTON_TEXT.LOGIN,
		themeColor: THEME_COLORS.BLUE,
	},
	decorators: [withFormSubmission("successWithAlert"), withFormInteraction({ autoSubmitDelay: 1500, shouldAutoVerifyCaptcha: true }), withContainer(CONTAINER_SIZES.FORM.WIDTH, CONTAINER_SIZES.FORM.HEIGHT)],
	parameters: {
		docs: {
			description: {
				story: "This story automatically verifies the CAPTCHA after 1 second to demonstrate the entire workflow.",
			},
		},
	},
};
