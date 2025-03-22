import type { ILanguage } from "../interface";
import type { TTranslateFunction } from "../type";

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
	if (browserLang.startsWith("ar")) {
		return ELanguage.AR;
	}

	if (browserLang.startsWith("bg")) {
		return ELanguage.BG;
	}

	if (browserLang.startsWith("cs")) {
		return ELanguage.CS;
	}

	if (browserLang.startsWith("da")) {
		return ELanguage.DA;
	}

	if (browserLang.startsWith("de")) {
		return ELanguage.DE;
	}

	if (browserLang.startsWith("el")) {
		return ELanguage.EL;
	}

	if (browserLang.startsWith("es")) {
		return ELanguage.ES;
	}

	if (browserLang.startsWith("fi")) {
		return ELanguage.FI;
	}

	if (browserLang.startsWith("fr")) {
		return ELanguage.FR;
	}

	if (browserLang.startsWith("he")) {
		return ELanguage.HE;
	}

	if (browserLang.startsWith("hi")) {
		return ELanguage.HI;
	}

	if (browserLang.startsWith("hu")) {
		return ELanguage.HU;
	}

	if (browserLang.startsWith("id")) {
		return ELanguage.ID;
	}

	if (browserLang.startsWith("it")) {
		return ELanguage.IT;
	}

	if (browserLang.startsWith("ja")) {
		return ELanguage.JA;
	}

	if (browserLang.startsWith("ko")) {
		return ELanguage.KO;
	}

	if (browserLang.startsWith("nl")) {
		return ELanguage.NL;
	}

	if (browserLang.startsWith("no")) {
		return ELanguage.NO;
	}

	if (browserLang.startsWith("pl")) {
		return ELanguage.PL;
	}

	if (browserLang.startsWith("pt")) {
		return ELanguage.PT;
	}

	if (browserLang.startsWith("ro")) {
		return ELanguage.RO;
	}

	if (browserLang.startsWith("ru")) {
		return ELanguage.RU;
	}

	if (browserLang.startsWith("sk")) {
		return ELanguage.SK;
	}

	if (browserLang.startsWith("sv")) {
		return ELanguage.SV;
	}

	if (browserLang.startsWith("th")) {
		return ELanguage.TH;
	}

	if (browserLang.startsWith("tr")) {
		return ELanguage.TR;
	}

	if (browserLang.startsWith("uk")) {
		return ELanguage.UK;
	}

	if (browserLang.startsWith("vi")) {
		return ELanguage.VI;
	}

	if (browserLang.startsWith("zh")) {
		return ELanguage.ZH;
	}

	// Default to English
	return ELanguage.EN;
}
