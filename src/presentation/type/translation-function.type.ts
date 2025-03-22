import type { ILanguage } from "../interface";

/**
 * Type for the translation function
 */
export type TTranslateFunction = (key: keyof ILanguage) => string;
