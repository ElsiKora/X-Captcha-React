import type { ChallengeCreateResponse } from "@elsikora/x-captcha-client/api";

import type { EChallengeType } from "../../infrastructure/enum/challenge-type.enum";
import type { IPowSolverConfig } from "../../infrastructure/interface/pow-solver/config.interface";

import type { ICaptchaTheme } from "./captcha-theme.interface";

export interface ICaptchaWidgetProperties {
	/**
	 * The URL of the captcha API
	 */
	apiUrl: string;

	/**
	 * Type of challenge to display (e.g., click, pow)
	 */
	challengeType: EChallengeType;

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
	onLoad?: (challenge: ChallengeCreateResponse) => void;

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
	 * Complete theme configuration for visual customization
	 * Groups all visual properties like colors, typography, spacing, etc.
	 */
	theme?: ICaptchaTheme;

	/**
	 * Width of the captcha widget
	 */
	width?: number | string;
}
