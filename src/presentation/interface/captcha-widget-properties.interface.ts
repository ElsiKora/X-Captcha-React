import type { ChallengeCreateResponse } from "@elsikora/x-captcha-client/api";

import type { EChallengeType } from "../../infrastructure/enum/challenge-type.enum";
import type { IPowSolverConfig } from "../../infrastructure/interface/pow-solver/config.interface";

export interface ICaptchaWidgetProperties {
	/**
	 * The URL of the captcha API
	 */
	apiUrl: string;

	/**
	 * Background color for the captcha widget
	 */
	backgroundColor?: string;

	/**
	 * Color for the brand name text
	 */
	brandNameColor?: string;

	/**
	 * Type of challenge to display (e.g., click, pow)
	 */
	challengeType: EChallengeType;

	/**
	 * Color for the checkmark when the captcha is verified
	 */
	checkmarkColor?: string;

	/**
	 * Color for the error text
	 */
	errorTextColor?: string;

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
	 * Callback called when a challenge is successfully loaded
	 */
	onLoaded?: (challenge: ChallengeCreateResponse) => void;

	/**
	 * Callback called when captcha is successfully verified
	 */
	onVerify?: (token: string) => void;

	/**
	 * Configuration options for the PoW solver
	 * If not provided, will use default values
	 */
	powSolver?: IPowSolverConfig;

	/**
	 * Public key for the captcha widget (required)
	 */
	publicKey: string;

	/**
	 * Whether to show the brand name in the widget
	 * @default true
	 */
	shouldShowBrandName?: boolean;

	/**
	 * Theme color for the captcha widget
	 */
	themeColor?: string;

	/**
	 * Background color for the "Try Again" button
	 */
	tryAgainButtonBackgroundColor?: string;

	/**
	 * Text color for the "Try Again" button
	 */
	tryAgainButtonTextColor?: string;

	/**
	 * Width of the captcha widget
	 */
	width?: number | string;
}
