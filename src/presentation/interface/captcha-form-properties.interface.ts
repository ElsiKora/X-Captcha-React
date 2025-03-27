import type { FormEvent } from "react";
import type React from "react";

import type { ICaptchaWidgetProperties } from "./captcha-widget-properties.interface";

/**
 * Props for the CaptchaForm component
 */
export interface ICaptchaFormProperties extends Omit<ICaptchaWidgetProperties, "onError" | "onVerify"> {
	/**
	 * Button color theme
	 */
	buttonColor?: string;

	/**
	 * Children elements to include in the form
	 */
	children?: React.ReactNode;

	/**
	 * Additional classname for the form
	 */
	className?: string;

	/**
	 * Language for the form and captcha widget (e.g., 'en', 'ru')
	 * If not provided, will auto-detect from browser settings
	 */
	language?: string;

	/**
	 * Callback called when form is submitted with a valid captcha
	 */
	onSubmit: (token: string, event: FormEvent) => void;

	/**
	 * Public key for the captcha widget (required)
	 */
	publicKey: string;

	/**
	 * Submit button text
	 */
	submitButtonText?: string;
}
