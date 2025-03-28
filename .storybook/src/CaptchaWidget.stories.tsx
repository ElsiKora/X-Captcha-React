/* eslint-disable @elsikora/typescript/no-magic-numbers */
// eslint-disable-next-line @elsikora/react/1/naming-convention/filename-extension
import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import { CaptchaWidget } from "../../src";
import { EChallengeType } from "../../src/infrastructure/enum/challenge-type.enum";

import { BACKGROUND_COLORS, CONTAINER_SIZES, DEFAULT_API_URL, DEFAULT_CHALLENGE_TYPE, DEFAULT_LANGUAGE, DEFAULT_POW_SOLVER_CONFIG, DEFAULT_PUBLIC_KEY, RESPONSE_DELAYS, SUPPORTED_LANGUAGES, THEME_COLORS, WIDGET_DIMENSIONS } from "./Constants";
import { withContainer, withLanguage, withMockCaptchaClient, withThemeColor } from "./Decorators";

/**
 * The CaptchaWidget component provides a modern and user-friendly CAPTCHA challenge interface
 * to verify that users are human. It supports different themes, languages, and is fully
 * customizable to match your application's design.
 */
const meta: Meta<typeof CaptchaWidget> = {
	args: {
		challengeType: EChallengeType.POW,
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
		backgroundColor: {
			control: "color",
			description: "Background color for the captcha widget",
			table: {
				defaultValue: { summary: BACKGROUND_COLORS.DEFAULT },
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
		challengeType: {
			control: "select",
			description: "Type of challenge to display",
			options: Object.values(EChallengeType),
			table: {
				defaultValue: { summary: DEFAULT_CHALLENGE_TYPE },
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
				defaultValue: { summary: WIDGET_DIMENSIONS.DEFAULT_HEIGHT },
				type: { summary: "number | string" },
			},
		},
		language: {
			control: "select",
			description: "Language for the widget text (auto-detects if not provided)",
			options: SUPPORTED_LANGUAGES,
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
		powSolver: {
			control: "object",
			description: "Configuration options for the PoW solver",
			table: {
				defaultValue: {
					summary: `{ batchSize: ${String(DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE)}, maxAttempts: ${String(DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS)}, workerTimeout: ${String(DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT)} }`,
				},
				type: { summary: "IPowSolverConfig" },
			},
		},
		publicKey: {
			control: "text",
			description: "The public key for the captcha API",
			table: {
				type: { summary: "string" },
			},
		},
		secretKey: {
			control: "text",
			description: "The secret key for the captcha API",
			table: {
				type: { summary: "string" },
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
				defaultValue: { summary: THEME_COLORS.BLUE },
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
				defaultValue: { summary: WIDGET_DIMENSIONS.DEFAULT_WIDTH },
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
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		errorTextColor: "#d10707",
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		language: "uk",
		onError: fn((error: unknown) => {
			console.error("Captcha verification error:", error);
		}),
		onVerify: fn((token: string) => {
			console.log("Captcha verified with token:", token);
		}),
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		publicKey: "sd3w5w35",
		themeColor: "#f142f5",
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.BLUE)],
};

/**
 * CaptchaWidget with custom dimensions (wider and taller).
 */
export const CustomSize: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.LARGE_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		publicKey: DEFAULT_PUBLIC_KEY,
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.LARGE_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(500, 220), withThemeColor(THEME_COLORS.BLUE)],
};

/**
 * CaptchaWidget with a different theme color (green).
 */
export const GreenTheme: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		language: "uk",
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.GREEN,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.GREEN)],
};

/**
 * CaptchaWidget with a custom background color.
 */
export const CustomBackground: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		backgroundColor: BACKGROUND_COLORS.LIGHT_BLUE,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.BLUE, BACKGROUND_COLORS.LIGHT_BLUE)],
};

/**
 * CaptchaWidget with dark theme.
 */
export const DarkTheme: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		backgroundColor: BACKGROUND_COLORS.DARK,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: 1000,
			maxAttempts: 1,
			workerTimeout: 30_000,
		},
		themeColor: THEME_COLORS.PURPLE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.PURPLE, BACKGROUND_COLORS.DARK)],
};

/**
 * CaptchaWidget with custom brand name color.
 */
export const CustomBrandColor: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		brandNameColor: "#3366ff",
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.BLUE)],
};

/**
 * CaptchaWidget with hidden brand name.
 */
export const HiddenBrandName: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		shouldShowBrandName: false,
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage(DEFAULT_LANGUAGE), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.BLUE)],
};

/**
 * CaptchaWidget with custom checkmark color.
 */
export const CustomCheckmark: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		checkmarkColor: "#ffcc00",
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.DEFAULT,
			shouldSucceed: true,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
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
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		errorTextColor: "#e91e63",
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		tryAgainButtonBackgroundColor: "#e0e0e0",
		tryAgainButtonTextColor: "#333333",
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.LONG,
			shouldSucceed: false,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
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
 * CaptchaWidget with faster PoW solver.
 */
export const FastPowSolver: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: 500,
			maxAttempts: 1_000_000,
			workerTimeout: 60_000,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.LONG,
			shouldSucceed: true,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
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
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.LONG,
			shouldSucceed: true,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
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
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.LONG,
			shouldSucceed: false,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
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
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.SLOW_NETWORK,
			shouldSucceed: true,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
	],
};

/**
 * CaptchaWidget in Russian language.
 */
export const RussianLanguage: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		language: "ru",
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [withMockCaptchaClient({ shouldSucceed: true }), withLanguage("ru"), withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT), withThemeColor(THEME_COLORS.BLUE)],
};

/**
 * CaptchaWidget with network timeout error.
 */
export const NetworkTimeout: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.POW,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		powSolver: {
			batchSize: DEFAULT_POW_SOLVER_CONFIG.BATCH_SIZE,
			maxAttempts: DEFAULT_POW_SOLVER_CONFIG.MAX_ATTEMPTS,
			workerTimeout: DEFAULT_POW_SOLVER_CONFIG.WORKER_TIMEOUT,
		},
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.LONG,
			shouldTimeout: true,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
	],
};

/**
 * CaptchaWidget with click challenge type.
 */
export const ClickChallenge: StoryObj<typeof CaptchaWidget> = {
	args: {
		apiUrl: DEFAULT_API_URL,
		challengeType: EChallengeType.CLICK,
		height: WIDGET_DIMENSIONS.DEFAULT_HEIGHT,
		themeColor: THEME_COLORS.BLUE,
		width: WIDGET_DIMENSIONS.DEFAULT_WIDTH,
	},
	decorators: [
		withMockCaptchaClient({
			responseDelay: RESPONSE_DELAYS.DEFAULT,
			shouldSucceed: true,
		}),
		withLanguage(DEFAULT_LANGUAGE),
		withContainer(CONTAINER_SIZES.DEFAULT.WIDTH, CONTAINER_SIZES.DEFAULT.HEIGHT),
		withThemeColor(THEME_COLORS.BLUE),
	],
};
