import type { XCaptchaApiClient } from "@elsikora/x-captcha-client";

export interface ICaptchaContext {
	/**
	 * The captcha client instance
	 */
	client: XCaptchaApiClient;
}
