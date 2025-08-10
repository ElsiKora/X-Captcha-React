import type { CSSProperties } from "react";

import type { ICaptchaTheme } from "../interface/captcha-theme.interface";

import { GetHoverBackgroundColor } from "./get-hover-background-color.utility";

/**
 * Helper function to set CSS variable
 * @param {CSSProperties} variables - The CSS variables object
 * @param {string} name - The CSS variable name
 * @param {string | number | undefined} value - The value to set
 */
const setCSSVariable = (variables: CSSProperties, name: string, value: number | string | undefined): void => {
	if (value !== undefined) {
		// @ts-ignore
		variables[name] = value;
	}
};

/**
 * Apply color settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["colors"]} colors - The colors configuration
 */
const applyColors = (variables: CSSProperties, colors?: ICaptchaTheme["colors"]): void => {
	if (!colors) return;

	setCSSVariable(variables, "--x-captcha-primary", colors.primary);
	setCSSVariable(variables, "--x-captcha-error", colors.error);
	setCSSVariable(variables, "--x-captcha-background", colors.background);
	setCSSVariable(variables, "--x-captcha-text", colors.text);
	setCSSVariable(variables, "--x-captcha-text-light", colors.textLight);
	setCSSVariable(variables, "--x-captcha-border-light", colors.border);
	setCSSVariable(variables, "--x-captcha-disabled", colors.disabled);
	setCSSVariable(variables, "--x-captcha-disabled-bg", colors.disabledBackground);

	// Set spinner border based on primary color
	if (colors.primary) {
		setCSSVariable(variables, "--x-captcha-spinner-border", `${colors.primary} transparent ${colors.primary} ${colors.primary}`);
	}
};

/**
 * Apply checkbox settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["checkbox"]} checkbox - The checkbox configuration
 */
const applyCheckbox = (variables: CSSProperties, checkbox?: ICaptchaTheme["checkbox"]): void => {
	if (!checkbox) return;

	setCSSVariable(variables, "--x-captcha-checkmark", checkbox.checkmarkColor);
};

/**
 * Apply retry button settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["retryButton"]} retryButton - The retry button configuration
 */
const applyRetryButton = (variables: CSSProperties, retryButton?: ICaptchaTheme["retryButton"]): void => {
	if (!retryButton) return;

	setCSSVariable(variables, "--x-captcha-btn-bg", retryButton.backgroundColor);
	setCSSVariable(variables, "--x-captcha-btn-text", retryButton.textColor);
	setCSSVariable(variables, "--x-captcha-btn-icon", retryButton.iconColor);
	setCSSVariable(variables, "--x-captcha-btn-border", retryButton.borderColor);
	setCSSVariable(variables, "--x-captcha-btn-radius", retryButton.borderRadius);
	setCSSVariable(variables, "--x-captcha-btn-border-width", retryButton.borderWidth);

	// Handle hover background
	if (retryButton.backgroundColor) {
		const hoverBg = retryButton.hoverBackgroundColor ?? GetHoverBackgroundColor(retryButton.backgroundColor);
		setCSSVariable(variables, "--x-captcha-btn-hover-bg", hoverBg);
	}
};

/**
 * Apply submit button settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["submitButton"]} submitButton - The submit button configuration
 */
const applySubmitButton = (variables: CSSProperties, submitButton?: ICaptchaTheme["submitButton"]): void => {
	if (!submitButton) return;

	setCSSVariable(variables, "--x-captcha-submit-btn-bg", submitButton.backgroundColor);
	setCSSVariable(variables, "--x-captcha-submit-btn-text", submitButton.textColor);
	setCSSVariable(variables, "--x-captcha-submit-btn-hover-bg", submitButton.hoverBackgroundColor);
	setCSSVariable(variables, "--x-captcha-disabled-bg", submitButton.disabledBackgroundColor);
	setCSSVariable(variables, "--x-captcha-disabled", submitButton.disabledTextColor);
	setCSSVariable(variables, "--x-captcha-submit-btn-radius", submitButton.borderRadius);

	// Generate outline color if not provided
	if (submitButton.backgroundColor) {
		const outlineColor = submitButton.focusOutlineColor ?? (submitButton.backgroundColor.startsWith("#") && submitButton.backgroundColor.length === 7 ? `${submitButton.backgroundColor}40` : undefined);
		setCSSVariable(variables, "--x-captcha-submit-btn-outline", outlineColor);
	}
};

/**
 * Apply spinner settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["spinner"]} spinner - The spinner configuration
 */
const applySpinner = (variables: CSSProperties, spinner?: ICaptchaTheme["spinner"]): void => {
	if (!spinner) return;

	if (spinner.color) {
		setCSSVariable(variables, "--x-captcha-spinner-border", `${spinner.color} transparent ${spinner.color} ${spinner.color}`);
	}
	setCSSVariable(variables, "--x-captcha-spinner-size", spinner.size);
	setCSSVariable(variables, "--x-captcha-spinner-border-width", spinner.borderWidth);
};

/**
 * Apply overlay settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["overlay"]} overlay - The overlay configuration
 */
const applyOverlay = (variables: CSSProperties, overlay?: ICaptchaTheme["overlay"]): void => {
	if (!overlay) return;

	setCSSVariable(variables, "--x-captcha-overlay-bg", overlay.backgroundColor);
	setCSSVariable(variables, "--x-captcha-overlay-text", overlay.textColor);

	if (overlay.opacity !== undefined) {
		setCSSVariable(variables, "--x-captcha-overlay-opacity", overlay.opacity.toString());
	}
};

/**
 * Apply typography settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["typography"]} typography - The typography configuration
 */
const applyTypography = (variables: CSSProperties, typography?: ICaptchaTheme["typography"]): void => {
	if (!typography) return;

	setCSSVariable(variables, "--x-captcha-font-family", typography.fontFamily);
	setCSSVariable(variables, "--x-captcha-font-xs", typography.fontSizeXs);
	setCSSVariable(variables, "--x-captcha-font-sm", typography.fontSizeSm);
	setCSSVariable(variables, "--x-captcha-font-md", typography.fontSizeMd);
};

/**
 * Apply effects settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["effects"]} effects - The effects configuration
 */
const applyEffects = (variables: CSSProperties, effects?: ICaptchaTheme["effects"]): void => {
	if (!effects) return;

	setCSSVariable(variables, "--x-captcha-shadow-sm", effects.shadowSm);
	setCSSVariable(variables, "--x-captcha-shadow", effects.shadow);
	setCSSVariable(variables, "--x-captcha-shadow-lg", effects.shadowLg);

	if (effects.transitionFast) {
		setCSSVariable(variables, "--x-captcha-transition-fast", `all ${effects.transitionFast} ease`);
	}

	if (effects.transitionNormal) {
		setCSSVariable(variables, "--x-captcha-transition", `all ${effects.transitionNormal} ease`);
	}
};

/**
 * Apply spacing settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["spacing"]} spacing - The spacing configuration
 */
const applySpacing = (variables: CSSProperties, spacing?: ICaptchaTheme["spacing"]): void => {
	if (!spacing) return;

	setCSSVariable(variables, "--x-captcha-spacing-xs", spacing.xs);
	setCSSVariable(variables, "--x-captcha-spacing-sm", spacing.sm);
	setCSSVariable(variables, "--x-captcha-spacing", spacing.normal);
	setCSSVariable(variables, "--x-captcha-spacing-md", spacing.md);
	setCSSVariable(variables, "--x-captcha-spacing-lg", spacing.lg);
};

/**
 * Apply border radius settings to CSS variables
 * @param {CSSProperties} variables - The CSS variables object
 * @param {ICaptchaTheme["borderRadius"]} borderRadius - The border radius configuration
 */
const applyBorderRadius = (variables: CSSProperties, borderRadius?: ICaptchaTheme["borderRadius"]): void => {
	if (!borderRadius) return;

	setCSSVariable(variables, "--x-captcha-radius-sm", borderRadius.sm);
	setCSSVariable(variables, "--x-captcha-radius", borderRadius.normal);
	setCSSVariable(variables, "--x-captcha-radius-lg", borderRadius.lg);
};

/**
 * Generates CSS variables from the theme structure
 * @param {ICaptchaTheme | undefined} theme - The theme configuration
 * @returns {CSSProperties} The generated CSS variables
 */
export const GenerateThemeVariables = (theme?: ICaptchaTheme): CSSProperties => {
	const cssVariables: CSSProperties = {};

	if (!theme) return cssVariables;

	// Apply all theme sections
	applyColors(cssVariables, theme.colors);
	applyCheckbox(cssVariables, theme.checkbox);
	applyRetryButton(cssVariables, theme.retryButton);
	applySubmitButton(cssVariables, theme.submitButton);
	applySpinner(cssVariables, theme.spinner);
	applyOverlay(cssVariables, theme.overlay);
	applyTypography(cssVariables, theme.typography);
	applyEffects(cssVariables, theme.effects);
	applySpacing(cssVariables, theme.spacing);
	applyBorderRadius(cssVariables, theme.borderRadius);

	// Default to primary color for submit button if not specified
	if (!theme.submitButton?.backgroundColor && theme.colors?.primary) {
		setCSSVariable(cssVariables, "--x-captcha-submit-btn-bg", theme.colors.primary);

		if (theme.colors.primary.startsWith("#") && theme.colors.primary.length === 7) {
			setCSSVariable(cssVariables, "--x-captcha-submit-btn-outline", `${theme.colors.primary}40`);
		}
	}

	return cssVariables;
};
