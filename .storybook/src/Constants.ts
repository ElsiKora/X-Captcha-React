/**
 * Centralized constants for Storybook stories
 */

/**
 * Default API URL for Captcha services
 */
export const DEFAULT_API_URL = "http://127.0.0.1:4000";

/**
 * Default public key for Captcha
 */
export const DEFAULT_PUBLIC_KEY = "43f7f0f7-0eb9-4d5b-ade4-1414e30477b9";

/**
 * Default theme colors
 */
export const THEME_COLORS = {
  BLUE: "#4285F4",
  GREEN: "#34A853",
  RED: "#EA4335",
  PURPLE: "#bb86fc",
};

/**
 * Default widget dimensions
 */
export const WIDGET_DIMENSIONS = {
  DEFAULT_HEIGHT: 74,
  DEFAULT_WIDTH: 300,
  LARGE_HEIGHT: 100,
  LARGE_WIDTH: 400,
};

/**
 * Default response delays (ms)
 */
export const RESPONSE_DELAYS = {
  DEFAULT: 500,
  LONG: 800,
  SLOW_NETWORK: 3000,
};

/**
 * Default container sizes
 */
export const CONTAINER_SIZES = {
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
export const BACKGROUND_COLORS = {
  DEFAULT: "#fff",
  DARK: "#1a1a1a",
  LIGHT_BLUE: "#f3f9fe",
};

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = [
  "ar", "bg", "cs", "da", "de", "el", "en", "es", "fi", "fr", 
  "he", "hi", "hu", "id", "it", "ja", "ko", "nl", "no", "pl", 
  "pt", "ro", "ru", "sk", "sv", "th", "tr", "uk", "vi", "zh"
];

/**
 * Default language 
 */
export const DEFAULT_LANGUAGE = "en";

/**
 * Submit button default text
 */
export const SUBMIT_BUTTON_TEXT = {
  DEFAULT: "Submit",
  LOGIN: "Login",
  REGISTER: "Register",
  CONTACT: "Send Message",
  LOGIN_RU: "Войти",
};