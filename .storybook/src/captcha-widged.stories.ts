/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import { CaptchaWidget } from "../../src";

import { withContainer, withLanguage, withMockCaptchaClient, withThemeColor } from "./Decorators";

/**
 * The CaptchaWidget component provides a modern and user-friendly CAPTCHA challenge interface
 * to verify that users are human. It supports different themes, languages, and is fully
 * customizable to match your application's design.
 */
const meta: Meta<typeof CaptchaWidget> = {
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
		backgroundColor: {
			control: "color",
			description: "Background color for the captcha widget",
			table: {
				defaultValue: { summary: "#fff" },
				type: { summary: "string" },
			},
		},
		brandNameColor: {
			control: "color",
			description: "Color for the brand name text",
			table: {
				defaultValue: { summary: "#aaa" },
				type: { summary: "string" },
			},
		},
		checkmarkColor: {
			control: "color",
			description: "Color for the checkmark when the captcha is verified",
			table: {
				defaultValue: { summary: "white" },
				type: { summary: "string" },
			},
		},
		errorTextColor: {
			control: "color",
			description: "Color for the error text",
			table: {
				defaultValue: { summary: "var(--x-captcha-error)" },
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
			description: "Language for the widget text (auto-detects if not provided)",
			options: ["en", "ru", "fr", "de", "es"],
			table: {
				defaultValue: { summary: "Auto-detected" },
				type: { summary: "string" },
			},
		},
		onError: {
			description: "Callback when captcha verification fails",
			table: {
				type: { summary: "(error: string) => void" },
			},
		},
		onVerify: {
			description: "Callback when captcha is successfully verified",
			table: {
				type: { summary: "(token: string) => void" },
			},
		},
		showBrandName: {
			control: "boolean",
			description: "Whether to show the brand name in the widget",
			table: {
				defaultValue: { summary: "true" },
				type: { summary: "boolean" },
			},
		},
		themeColor: {
			control: "color",
			description: "Theme color for the captcha widget",
			table: {
				defaultValue: { summary: "#4285F4" },
				type: { summary: "string" },
			},
		},
		tryAgainButtonBackgroundColor: {
			control: "color",
			description: "Background color for the 'Try Again' button",
			table: {
				defaultValue: { summary: "#f8f8f8" },
				type: { summary: "string" },
			},
		},
		tryAgainButtonTextColor: {
			control: "color",
			description: "Text color for the 'Try Again' button",
			table: {
				defaultValue: { summary: "var(--x-captcha-text)" },
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
	component: CaptchaWidget,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	title: "Components/CaptchaWidget",
};

export default meta;

/**
 * Default configuration of the CaptchaWidget with standard settings.
 */
export const Default: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:4000/api/captcha",
		height: 74,

		language: "ru",

		onError: fn((error: unknown) => {
			console.error("Captcha verification error:", error);
		}),

		onVerify: fn((token: string) => {
			console.log("Captcha verified with token:", token);
		}),
		themeColor: "#f142f5",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(400, 200), withThemeColor("#4285F4")],
};

/**
 * CaptchaWidget with custom dimensions (wider and taller).
 */
export const CustomSize: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 100,
		themeColor: "#4285F4",
		width: 400,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(500, 220), withThemeColor("#4285F4")],
};

/**
 * CaptchaWidget with a different theme color (green).
 */
export const GreenTheme: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		themeColor: "#34A853",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(400, 200), withThemeColor("#34A853")],
};

/**
 * CaptchaWidget with a custom background color.
 */
export const CustomBackground: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		backgroundColor: "#f3f9fe",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(400, 200), withThemeColor("#4285F4", "#f3f9fe")],
};

/**
 * CaptchaWidget with dark theme.
 */
export const DarkTheme: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		backgroundColor: "#1a1a1a",
		height: 74,
		themeColor: "#bb86fc",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(400, 200), withThemeColor("#bb86fc", "#1a1a1a")],
};

/**
 * CaptchaWidget with custom brand name color.
 */
export const CustomBrandColor: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		brandNameColor: "#3366ff",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(400, 200), withThemeColor("#4285F4")],
};

/**
 * CaptchaWidget with hidden brand name.
 */
export const HiddenBrandName: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		shouldShowBrandName: false,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("en"), withContainer(400, 200), withThemeColor("#4285F4")],
};

/**
 * CaptchaWidget with custom checkmark color.
 */
export const CustomCheckmark: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		checkmarkColor: "#ffcc00",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: 500,
			shouldSucceed: true,
		}),
		withLanguage("en"),
		withContainer(400, 200),
		withThemeColor("#4285F4"),
	],
	play: ({ canvasElement }: any) => {
		// Simulate user clicking on the captcha
		const canvas: HTMLElement = canvasElement as HTMLElement;
		const captchaContainer: Element | null = canvas.querySelector(".x-captcha-container");

		if (captchaContainer) {
			setTimeout(() => {
				(captchaContainer as HTMLElement).click();
			}, 500);
		}
	},
};

/**
 * CaptchaWidget with custom error styling.
 */
export const CustomErrorStyling: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		errorTextColor: "#e91e63",
		height: 74,
		themeColor: "#4285F4",
		tryAgainButtonBackgroundColor: "#e0e0e0",
		tryAgainButtonTextColor: "#333333",
		width: 300,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: 800,
			shouldSucceed: false,
		}),
		withLanguage("en"),
		withContainer(400, 200),
		withThemeColor("#4285F4"),
	],
	play: ({ canvasElement }: any) => {
		// Simulate user clicking on the captcha
		const canvas: HTMLElement = canvasElement as HTMLElement;
		const captchaContainer: Element | null = canvas.querySelector(".x-captcha-container");

		if (captchaContainer) {
			setTimeout(() => {
				(captchaContainer as HTMLElement).click();
			}, 1000);
		}
	},
};

/**
 * Simulates a successful verification response from the server.
 */
export const SuccessfulVerification: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: 800,
			shouldSucceed: true,
		}),
		withLanguage("en"),
		withContainer(400, 200),
		withThemeColor("#4285F4"),
	],
	play: ({ canvasElement }: any) => {
		// Simulate user clicking on the captcha
		const canvas: HTMLElement = canvasElement as HTMLElement;
		const captchaContainer: Element | null = canvas.querySelector(".x-captcha-container");

		if (captchaContainer) {
			setTimeout(() => {
				(captchaContainer as HTMLElement).click();
			}, 1000);
		}
	},
};

/**
 * Simulates a failed verification response from the server.
 */
export const FailedVerification: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:4000/api/captcha",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: 800,
			shouldSucceed: false,
		}),
		withLanguage("en"),
		withContainer(400, 200),
		withThemeColor("#4285F4"),
	],
	play: ({ canvasElement }: any) => {
		// Simulate user clicking on the captcha
		const canvas: HTMLElement = canvasElement as HTMLElement;
		const captchaContainer: Element | null = canvas.querySelector(".x-captcha-container");

		if (captchaContainer) {
			setTimeout(() => {
				(captchaContainer as HTMLElement).click();
			}, 1000);
		}
	},
};

/**
 * CaptchaWidget with longer server response time.
 */
export const SlowNetwork: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: 3000,
			shouldSucceed: true,
		}),
		withLanguage("en"),
		withContainer(400, 200),
		withThemeColor("#4285F4"),
	],
};

/**
 * CaptchaWidget in Russian language.
 */
export const RussianLanguage: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		language: "ru",
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("ru"), withContainer(400, 200), withThemeColor("#4285F4")],
};

/**
 * CaptchaWidget with network timeout error.
 */
export const NetworkTimeout: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		themeColor: "#4285F4",
		width: 300,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: 1000,
			shouldTimeout: true,
		}),
		withLanguage("en"),
		withContainer(400, 200),
		withThemeColor("#4285F4"),
	],
};
