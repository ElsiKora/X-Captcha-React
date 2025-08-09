/**
 * Centralized constants for Storybook stories
 */

/**
 * Default API URL for Captcha services
 */
export const DEFAULT_API_URL: string = "http://127.0.0.1:4000";

/**
 * Default public key for Captcha
 */
export const DEFAULT_PUBLIC_KEY: string = "43f7f0f7-0eb9-4d5b-ade4-1414e30477b9";

/**
 * Default challenge type
 */
export const DEFAULT_CHALLENGE_TYPE: string = "pow";

/**
 * Default theme colors
 */
export const THEME_COLORS: { BLUE: string; GREEN: string; PURPLE: string; RED: string } = {
	BLUE: "#4285F4",
	GREEN: "#34A853",
	PURPLE: "#bb86fc",
	RED: "#EA4335",
};

/**
 * Default widget dimensions
 */
export const WIDGET_DIMENSIONS: {
	DEFAULT_HEIGHT: number;
	DEFAULT_WIDTH: number;
	LARGE_HEIGHT: number;
	LARGE_WIDTH: number;
} = {
	DEFAULT_HEIGHT: 74,
	DEFAULT_WIDTH: 300,
	LARGE_HEIGHT: 100,
	LARGE_WIDTH: 400,
};

/**
 * Default response delays (ms)
 */
export const RESPONSE_DELAYS: { DEFAULT: number; LONG: number; SLOW_NETWORK: number } = {
	DEFAULT: 500,
	LONG: 800,
	SLOW_NETWORK: 3000,
};

/**
 * Default container sizes
 */
export const CONTAINER_SIZES: { DEFAULT: { HEIGHT: number; WIDTH: number }; FORM: { HEIGHT: string; WIDTH: number } } = {
	DEFAULT: {
		HEIGHT: 200,
		WIDTH: 400,
	},
	FORM: {
		HEIGHT: "auto",
		WIDTH: 500,
	},
};

/**
 * Default background colors
 */
export const BACKGROUND_COLORS: { DARK: string; DEFAULT: string; LIGHT_BLUE: string } = {
	DARK: "#1a1a1a",
	DEFAULT: "#fff",
	LIGHT_BLUE: "#f3f9fe",
};

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES: Array<string> = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "fi", "fr", "he", "hi", "hu", "id", "it", "ja", "ko", "nl", "no", "pl", "pt", "ro", "ru", "sk", "sv", "th", "tr", "uk", "vi", "zh"];

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: string = "en";

/**
 * Default PoW Solver configuration
 */
export const DEFAULT_POW_SOLVER_CONFIG: {
	BATCH_SIZE: number;
	MAX_ATTEMPTS: number;
	WORKER_TIMEOUT: number;
} = {
	BATCH_SIZE: 1000,
	MAX_ATTEMPTS: 500_000,
	WORKER_TIMEOUT: 30_000, // 30 seconds
};

/**
 * Submit button default text
 */
export const SUBMIT_BUTTON_TEXT: {
	CONTACT: string;
	DEFAULT: string;
	LOGIN: string;
	LOGIN_RU: string;
	REGISTER: string;
} = {
	CONTACT: "Send Message",
	DEFAULT: "Submit",
	LOGIN: "Login",
	LOGIN_RU: "Войти",
	REGISTER: "Register",
};
