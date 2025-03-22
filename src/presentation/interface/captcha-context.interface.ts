import type { CaptchaClient } from "@elsikora/x-captcha-client";

export interface ICaptchaContext {
	/**
	 * The captcha client instance
	 */
	client: CaptchaClient;
}
