import type { ReactNode } from "react";

export interface ICaptchaProviderProperties {
	/**
	 * The URL of the captcha API
	 */
	apiUrl: string;

	/**
	 * Children components
	 */
	children: ReactNode;
	
	/**
	 * Language code (e.g., 'en', 'fr')
	 * If not provided, will be auto-detected
	 */
	language?: string;

	/**
	 * The public key for the captcha API
	 */
	publicKey: string;
}
