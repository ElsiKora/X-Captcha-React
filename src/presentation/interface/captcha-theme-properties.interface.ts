import type { ICaptchaWidgetProperties } from "./captcha-widget-properties.interface";

/**
 * Interface for captcha theme properties
 */
export interface ICaptchaThemeProperties extends Omit<ICaptchaWidgetProperties, "apiUrl" | "height" | "language" | "onError" | "onVerify" | "publicKey" | "secretKey" | "shouldShowBrandName" | "width"> {
	/**
	 * Button color theme (for CaptchaForm)
	 */
	buttonColor?: string;
}
