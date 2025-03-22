export interface ICaptchaWidgetProperties {
	/**
	 * The URL of the captcha API
	 */
	apiUrl: string;

	/**
	 * Height of the captcha widget
	 */
	height?: number | string;

	/**
	 * Language for the widget text (e.g., 'en', 'ru')
	 * If not provided, will auto-detect from browser settings
	 */
	language?: string;

	/**
	 * Callback called when captcha verification fails
	 */
	onError?: (error: string) => void;

	/**
	 * Callback called when captcha is successfully verified
	 */
	onVerify?: (token: string) => void;

	/**
	 * Theme color for the captcha widget
	 */
	themeColor?: string;

	/**
	 * Width of the captcha widget
	 */
	width?: number | string;
}
