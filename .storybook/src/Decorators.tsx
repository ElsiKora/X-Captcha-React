/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { CaptchaClient } from "@elsikora/x-captcha-client";
import type { Decorator, ReactRenderer, StrictArgs } from "@storybook/react";
import type { StoryContext, StoryContextUpdate } from "@storybook/types";
import type { ReactElement } from "react";

import type { TFormSubmitHandler } from "./type";

import React from "react";

import { CONTAINER_SIZES, DEFAULT_API_URL, DEFAULT_LANGUAGE, DEFAULT_PUBLIC_KEY, RESPONSE_DELAYS, SUPPORTED_LANGUAGES, THEME_COLORS } from "./Constants";
import { MockCaptchaClient, mockFormHandlers } from "./mocks";

/**
 * Decorator to provide language selection
 * @param {string} languageCode - The language code to use
 * @returns {Decorator} A decorator function
 */
export const withLanguage = (languageCode: string = DEFAULT_LANGUAGE): Decorator => {
	// eslint-disable-next-line @elsikora/typescript/naming-convention
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Allow overriding the language from Story args

		const effectiveLanguage: string = (context.args?.language as string) ?? languageCode;

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
	// eslint-disable-next-line @elsikora/typescript/naming-convention
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Create a mock client for the story
		const apiUrl: string = (context.args.apiUrl as string) ?? DEFAULT_API_URL;
		const publicKey: string = (context.args.publicKey as string) ?? DEFAULT_PUBLIC_KEY;

		// Mock the CaptchaClient before rendering
		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access
		const originalCaptchaClient: CaptchaClient = (globalThis as any).CaptchaClient as CaptchaClient;

		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access
		(globalThis as any).CaptchaClient = MockCaptchaClient;
		// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access
		(globalThis as any).CaptchaClientOptions = {
			apiUrl,
			publicKey,
			responseDelay: options.responseDelay ?? RESPONSE_DELAYS.DEFAULT,
			shouldSucceed: options.shouldSucceed ?? true,
			shouldTimeout: options.shouldTimeout ?? false,
		};

		// Render the story with the mock
		const storyElement: React.ReactElement = Story(context) as ReactElement;

		// Cleanup after unmounting
		React.useEffect(() => {
			return (): void => {
				// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access
				(globalThis as any).CaptchaClient = originalCaptchaClient;
				// eslint-disable-next-line @elsikora/typescript/no-unsafe-member-access
				delete (globalThis as any).CaptchaClientOptions;
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
	// eslint-disable-next-line @elsikora/typescript/naming-convention
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
	// eslint-disable-next-line @elsikora/typescript/naming-convention
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Allow overriding the theme color and background color from Story args
		const effectiveThemeColor: string = (context.args.themeColor as string) ?? themeColor;
		const effectiveBackgroundColor: string | undefined = (context.args.backgroundColor as string) ?? backgroundColor;

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
	// eslint-disable-next-line @elsikora/typescript/naming-convention
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"], context: StoryContext<ReactRenderer, StrictArgs>) => {
		// Set the onSubmit handler in the story args
		context.args.onSubmit = customHandler ?? mockFormHandlers[handlerType];

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
					{/* eslint-disable-next-line @elsikora/i18next/no-literal-string */}
					{"Form submission handler: "}
					{handlerType}
					{/* eslint-disable-next-line @elsikora/i18next/no-literal-string */}
					{handlerType === "logger" && " (check browser console)"}
					{/* eslint-disable-next-line @elsikora/i18next/no-literal-string */}
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

	// eslint-disable-next-line @elsikora/typescript/naming-convention
	return (Story: (update?: StoryContextUpdate<Partial<StrictArgs>>) => ReactRenderer["storyResult"]) => {
		React.useEffect(() => {
			if (shouldAutoVerifyCaptcha) {
				// Simulate verifying the CAPTCHA after a delay
				const timerId: any = setTimeout(() => {
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
					// eslint-disable-next-line @elsikora/typescript/no-unsafe-argument
					clearTimeout(timerId);
				};
			}
		}, []);

		return <Story />;
	};
};
