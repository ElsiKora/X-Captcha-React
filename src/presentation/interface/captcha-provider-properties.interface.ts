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
}
