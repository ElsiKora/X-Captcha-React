/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { FormEvent } from "react";
import type React from "react";

import type { TFormSubmitHandler } from "../type";

/**
 * Handler interface for form submission
 */

/**
 * Creates a logger handler that logs form submission with token
 * @param {object} options - Configuration options
 * @param {string} options.logLevel - Log level
 * @param {string} options.logPrefix - Log prefix
 * @returns {TFormSubmitHandler} A form submission handler
 */
export const createLoggerHandler = (
	options: {
		logLevel?: "error" | "info" | "warn";
		logPrefix?: string;
	} = {},
): TFormSubmitHandler => {
	const {
		logLevel = "info",
		logPrefix = "📝 Form submitted",
	}: {
		logLevel?: "error" | "info" | "warn";
		logPrefix?: string;
	} = options;

	return (token: string, event: FormEvent): void => {
		// Prevent actual form submission in Storybook
		event.preventDefault();

		// Log form submission info with provided token
		if (logLevel === "info") {
			console.info(`${logPrefix} with token: ${token}`);
		} else if (logLevel === "warn") {
			console.warn(`${logPrefix} with token: ${token}`);
		} else {
			console.error(`${logPrefix} with token: ${token}`);
		}
	};
};

/**
 * Creates a form submission handler with a success message
 * @param {object} options - Configuration options
 * @param {boolean} options.shouldShowAlert - Whether to show an alert
 * @param {string} options.successMessage - Success message
 * @returns {TFormSubmitHandler} A form submission handler
 */
export const createSuccessHandler = (
	options: {
		shouldShowAlert?: boolean;
		successMessage?: string;
	} = {},
): TFormSubmitHandler => {
	const {
		shouldShowAlert = false,
		successMessage = "Form successfully submitted! CAPTCHA verification complete.",
	}: {
		shouldShowAlert?: boolean;
		successMessage?: string;
	} = options;

	return (token: string, event: FormEvent): void => {
		// Prevent actual form submission in Storybook
		event.preventDefault();

		// Log success message
		console.info(`✅ ${successMessage} Token: ${token}`);

		// Optionally show an alert (useful for interactive stories)
		if (shouldShowAlert) {
			// Use setTimeout to avoid blocking the UI
			setTimeout(() => {
				// eslint-disable-next-line @elsikora/javascript/no-undef
				alert(successMessage);
			}, 100);
		}
	};
};

/**
 * Creates a form submission handler that simulates an error
 * @param {object} options - Configuration options
 * @param {string} options.errorMessage - Error message
 * @param {number} options.simulateDelayMs - Delay before simulating error
 * @returns {TFormSubmitHandler} A form submission handler
 */
export const createErrorHandler = (
	options: {
		errorMessage?: string;
		simulateDelayMs?: number;
	} = {},
): TFormSubmitHandler => {
	const {
		errorMessage = "Error processing form submission.",
		simulateDelayMs = 500,
	}: {
		errorMessage?: string;
		simulateDelayMs?: number;
	} = options;

	return (token: string, event: FormEvent): void => {
		// Prevent actual form submission in Storybook
		event.preventDefault();

		// Log error information
		console.error(`❌ ${errorMessage} Token: ${token}`);

		// Simulate a delayed error response
		if (simulateDelayMs > 0) {
			setTimeout(() => {
				console.error(`Server responded with error after ${String(simulateDelayMs)}ms`);
			}, simulateDelayMs);
		}
	};
};

/**
 * Default mock handlers for use in stories
 */
export const mockFormHandlers: {
	error: (token: string, event: React.FormEvent) => void;
	logger: (token: string, event: React.FormEvent) => void;
	slowError: (token: string, event: React.FormEvent) => void;
	success: (token: string, event: React.FormEvent) => void;
	successWithAlert: (token: string, event: React.FormEvent) => void;
} = {
	error: createErrorHandler(),
	logger: createLoggerHandler(),
	slowError: createErrorHandler({ simulateDelayMs: 2000 }),
	success: createSuccessHandler(),
	successWithAlert: createSuccessHandler({ shouldShowAlert: true }),
};
