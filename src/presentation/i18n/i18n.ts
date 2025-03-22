import type { ILanguage } from "../interface";
import type { TTranslateFunction } from "../type/translation-function.type";

import { ELanguage } from "../enum";

import { translations } from "./translations";

/**
 * Creates a translation function for the specified language
 * @param {ELanguage | string} lang The language to use
 * @returns {TTranslateFunction} A function that translates keys to the specified language
 */
export function createTranslator(lang: ELanguage | string): TTranslateFunction {
	// Normalize the language string to match our enum
	const normalizedLang: ELanguage = lang.toLowerCase() as ELanguage;

	// Get the translation dictionary for the language or fall back to English
	const dictionary: ILanguage = translations[normalizedLang] || translations[ELanguage.EN];

	// Return a function that looks up keys in the dictionary
	return (key: keyof ILanguage): string => {
		return dictionary[key] || translations[ELanguage.EN][key] || key;
	};
}

/**
 * Detects the user's preferred language from the browser
 * @returns {ELanguage} The detected language code or fallback to English
 */
export function detectLanguage(): ELanguage {
	if (globalThis.window == undefined) {
		return ELanguage.EN; // Default to English in non-browser environments
	}

	// Get browser language
	// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
	const browserLang: string = navigator.language.toLowerCase();

	// Check if it starts with any of our supported languages
	if (browserLang.startsWith("ru")) {
		return ELanguage.RU;
	}

	// Default to English
	return ELanguage.EN;
}
