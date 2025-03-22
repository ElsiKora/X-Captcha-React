/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { Meta, StoryObj } from "@storybook/react";

import { CaptchaWidget } from "../presentation/components/CaptchaWidget";

import { withContainer, withLanguage, withMockCaptchaClient, withThemeColor } from "./decorators";

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
				defaultValue: { summary: "http://127.0.0.1:3000/api/captcha" },
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
			action: "error",
			description: "Callback when captcha verification fails",
			table: {
				type: { summary: "(error: string) => void" },
			},
		},
		onVerify: {
			action: "verified",
			description: "Callback when captcha is successfully verified",
			table: {
				type: { summary: "(token: string) => void" },
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
		apiUrl: "http://127.0.0.1:3000/api/captcha",
		height: 74,
		themeColor: "#4285F4",
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
		apiUrl: "http://127.0.0.1:3000/api/captcha",
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
