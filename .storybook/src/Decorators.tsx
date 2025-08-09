import type { XCaptchaApiClient } from "@elsikora/x-captcha-client";
import type { Decorator, ReactRenderer, StrictArgs } from "@storybook/react";
import type { ReactElement } from "react";
import type { StoryContext, StoryContextUpdate } from "storybook/internal/types";

import type { MockCaptchaClientOptions } from "./mocks";
import type { TFormSubmitHandler } from "./type";

import React from "react";

import { CONTAINER_SIZES, DEFAULT_API_URL, DEFAULT_LANGUAGE, DEFAULT_PUBLIC_KEY, RESPONSE_DELAYS, SUPPORTED_LANGUAGES, THEME_COLORS } from "./Constants";
import { MockCaptchaClient, mockFormHandlers } from "./mocks";

interface CustomGlobalThis {
	CaptchaClientOptions?: MockCaptchaClientOptions;
	XCaptchaApiClient?: typeof XCaptchaApiClient;
}

interface StoryArguments {
	apiUrl?: string;
	backgroundColor?: string;
	language?: string;
	onSubmit?: TFormSubmitHandler;
	onVerify?: TFormSubmitHandler;
	publicKey?: string;
	themeColor?: string;
}

/**
 * Decorator to provide language selection
 * @param {string} languageCode - The language code to use
 * @returns {Decorator} A decorator function
 */
export const withLanguage = (languageCode: string = DEFAULT_LANGUAGE): Decorator => {
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Allow overriding the language from Story args

		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access,@elsikora/typescript/no-explicit-any
		const storyArguments = (context as any).args as StoryArguments;
		const effectiveLanguage: string = storyArguments?.language ?? languageCode;

		const language: string = SUPPORTED_LANGUAGES.includes(effectiveLanguage) ? effectiveLanguage : DEFAULT_LANGUAGE;

		return (
			<div className={"language-context"} data-language={language}>
				<Story />
			</div>
		);
	};
};

/**
 * Decorator to mock the captcha client
 * @param {object} options - Configuration options
 * @param {number} options.responseDelay - Delay before the response is returned
 * @param {boolean} options.shouldSucceed - Whether the request should succeed
 * @param {boolean} options.shouldTimeout - Whether the request should time out
 * @returns {Decorator} A decorator function
 */
export const withMockCaptchaClient = (
	options: {
		responseDelay?: number;
		shouldSucceed?: boolean;
		shouldTimeout?: boolean;
	} = {},
): Decorator => {
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Create a mock client for the story
		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access,@elsikora/typescript/no-explicit-any
		const storyArguments = (context as any).args as StoryArguments;
		const apiUrl: string = storyArguments.apiUrl ?? DEFAULT_API_URL;
		const publicKey: string = storyArguments.publicKey ?? DEFAULT_PUBLIC_KEY;

		// Mock the CaptchaClient before rendering
		const originalCaptchaClient = (globalThis as unknown as CustomGlobalThis).XCaptchaApiClient;

		(globalThis as unknown as CustomGlobalThis).XCaptchaApiClient = MockCaptchaClient as unknown as typeof XCaptchaApiClient;
		(globalThis as unknown as CustomGlobalThis).CaptchaClientOptions = {
			baseUrl: apiUrl,
			publicKey,
			responseDelay: options.responseDelay ?? RESPONSE_DELAYS.DEFAULT,
			secretKey: "",
			shouldSucceed: options.shouldSucceed ?? true,
			shouldTimeout: options.shouldTimeout ?? false,
		};

		// Render the story with the mock
		const storyElement: React.ReactElement = Story(context) as ReactElement;

		// Cleanup after unmounting
		React.useEffect(() => {
			return (): void => {
				(globalThis as unknown as CustomGlobalThis).XCaptchaApiClient = originalCaptchaClient;
				delete (globalThis as unknown as CustomGlobalThis).CaptchaClientOptions;
			};
		}, []);

		return storyElement;
	};
};

/**
 * Decorator to wrap stories in a container with specific dimensions
 * @param {number | string} width - The width of the container
 * @param {number | string} height - The height of the container
 * @returns {Decorator} A decorator function
 */
export const withContainer = (width: number | string = CONTAINER_SIZES.DEFAULT.WIDTH, height: number | string = CONTAINER_SIZES.DEFAULT.HEIGHT): Decorator => {
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"]) => {
		return (
			<div
				style={{
					alignItems: "center",
					backgroundColor: "#f5f5f5",
					borderRadius: "4px",
					display: "flex",
					height: typeof height === "number" ? `${String(height)}px` : height,
					justifyContent: "center",
					padding: "20px",
					width: typeof width === "number" ? `${String(width)}px` : width,
				}}>
				<Story />
			</div>
		);
	};
};

/**
 * Decorator for simulating different theme colors and background colors
 * @param {string} themeColor - The theme color to use
 * @param {string} backgroundColor - The background color to use
 * @returns {Decorator} A decorator function
 */
export const withThemeColor = (themeColor: string = THEME_COLORS.BLUE, backgroundColor?: string): Decorator => {
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Allow overriding the theme color and background color from Story args
		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access,@elsikora/typescript/no-explicit-any
		const storyArguments = (context as any).args as StoryArguments;
		const effectiveThemeColor: string = storyArguments.themeColor ?? themeColor;
		const effectiveBackgroundColor: string | undefined = storyArguments.backgroundColor ?? backgroundColor;

		return (
			<div data-background-color={effectiveBackgroundColor} data-theme-color={effectiveThemeColor}>
				<Story />
			</div>
		);
	};
};

/**
 * Decorator for form submission simulation
 * @param {string} handlerType - The type of form submission handler to use
 * @param {TFormSubmitHandler} customHandler - A custom form submission handler
 * @returns {Decorator} A decorator function
 */
export const withFormSubmission = (handlerType: "error" | "logger" | "slowError" | "success" | "successWithAlert" = "logger", customHandler?: TFormSubmitHandler): Decorator => {
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Set the onSubmit handler in the story args
		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access,@elsikora/typescript/no-explicit-any
		const storyArguments = (context as any).args as StoryArguments;
		storyArguments.onSubmit = customHandler ?? mockFormHandlers[handlerType];

		return (
			<div className={"form-submission-context"} data-handler-type={handlerType}>
				<Story />
				<div
					style={{
						backgroundColor: "#f0f0f0",
						borderRadius: "4px",
						color: "#666",
						fontFamily: "monospace",
						fontSize: "12px",
						marginTop: "10px",
						padding: "8px",
					}}>
					{}
					{"Form submission handler: "}
					{handlerType}
					{}
					{handlerType === "logger" && " (check browser console)"}
					{}
					{handlerType === "successWithAlert" && " (will show alert on submit)"}
				</div>
			</div>
		);
	};
};

/**
 * Decorator for simulating user interactions with the form
 * @param {object} options - Configuration options
 * @param {number} options.autoSubmitDelay - Delay before auto-submitting the form
 * @param {boolean} options.shouldAutoVerifyCaptcha - Whether to auto-verify the CAPTCHA
 * @returns {Decorator} A decorator function
 */
export const withFormInteraction = (
	options: {
		autoSubmitDelay?: number;
		shouldAutoVerifyCaptcha?: boolean;
	} = {},
): Decorator => {
	const {
		autoSubmitDelay = 2000,
		shouldAutoVerifyCaptcha = false,
	}: {
		autoSubmitDelay?: number;
		shouldAutoVerifyCaptcha?: boolean;
	} = options;

	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"]) => {
		React.useEffect(() => {
			if (shouldAutoVerifyCaptcha) {
				// Simulate verifying the CAPTCHA after a delay
				const timerId = setTimeout(() => {
					// eslint-disable-next-line @elsikora/javascript/no-undef
					const captchaContainer: Element | null = document.querySelector(".x-captcha-container");

					if (captchaContainer && captchaContainer instanceof HTMLElement) {
						captchaContainer.click();

						// If we should also auto-submit the form after verification
						if (autoSubmitDelay > 0) {
							// eslint-disable-next-line @elsikora/sonar/no-nested-functions
							setTimeout((): void => {
								// eslint-disable-next-line @elsikora/javascript/no-undef
								const submitButton: Element | null = document.querySelector(".x-captcha-submit-button");

								if (submitButton && submitButton instanceof HTMLElement) {
									submitButton.click();
								}
							}, autoSubmitDelay);
						}
					}
				}, 1000);

				return (): void => {
					clearTimeout(timerId);
				};
			}
		}, []);

		return <Story />;
	};
};
