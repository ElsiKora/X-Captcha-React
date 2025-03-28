/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { CSSProperties } from "react";

import type { ICaptchaThemeProperties } from "../interface";

import { GetHoverBackgroundColor } from "./get-hover-background-color.utility";

/**
 * Map of prop names to CSS variable names
 */
const THEME_CSS_VARIABLE_MAP: Record<keyof ICaptchaThemeProperties, string> = {
	backgroundColor: "--x-captcha-background",
	brandNameColor: "--x-captcha-text-light",
	buttonColor: "--x-captcha-submit-btn-bg",
	checkmarkColor: "--x-captcha-checkmark",
	errorTextColor: "--x-captcha-error",
	themeColor: "--x-captcha-primary",
	tryAgainButtonBackgroundColor: "--x-captcha-btn-bg",
	tryAgainButtonTextColor: "--x-captcha-btn-text",
};

/**
 * Generates CSS variables based on theme options
 * @param {ICaptchaThemeProperties} properties - The theme properties
 * @returns {CSSProperties} The generated CSS variables
 */
export const GenerateThemeVariables = (properties: ICaptchaThemeProperties): CSSProperties => {
	const cssVariables: CSSProperties = {};

	for (const [key, value] of Object.entries(properties)) {
		if (value && key in THEME_CSS_VARIABLE_MAP) {
			const cssVariableName: string | undefined = THEME_CSS_VARIABLE_MAP[key as keyof ICaptchaThemeProperties];
			// @ts-ignore
			// eslint-disable-next-line @elsikora/typescript/no-unsafe-assignment
			cssVariables[cssVariableName] = value;

			// eslint-disable-next-line @elsikora/sonar/no-gratuitous-expressions
			if (key === "tryAgainButtonBackgroundColor" && value) {
				// @ts-ignore

				// eslint-disable-next-line @elsikora/typescript/no-unsafe-argument
				cssVariables["--x-captcha-btn-hover-bg"] = GetHoverBackgroundColor(value);
			}

			// eslint-disable-next-line @elsikora/sonar/no-gratuitous-expressions
			if (key === "buttonColor" && value) {
				// @ts-ignore
				// eslint-disable-next-line @elsikora/typescript/no-unsafe-assignment
				cssVariables["--x-captcha-submit-btn-bg"] = value;

				// eslint-disable-next-line @elsikora/typescript/no-unsafe-call,@elsikora/typescript/no-unsafe-member-access
				if (value.startsWith("#") && value.length === 7) {
					// @ts-ignore
					cssVariables["--x-captcha-submit-btn-outline"] = `${String(value)}40`; // 25% opacity
				}
			}

			// eslint-disable-next-line @elsikora/sonar/no-gratuitous-expressions
			if (key === "themeColor" && value) {
				// @ts-ignore
				cssVariables["--x-captcha-spinner-border"] = `${String(value)} transparent ${String(value)} ${String(value)}`;

				if (!properties.buttonColor) {
					// @ts-ignore
					// eslint-disable-next-line @elsikora/typescript/no-unsafe-assignment
					cssVariables["--x-captcha-submit-btn-bg"] = value;

					// eslint-disable-next-line @elsikora/typescript/no-unsafe-call,@elsikora/typescript/no-unsafe-member-access
					if (value.startsWith("#") && value.length === 7) {
						// @ts-ignore
						cssVariables["--x-captcha-submit-btn-outline"] = `${String(value)}40`; // 25% opacity
					}
				}
			}
		}
	}

	return cssVariables;
};
