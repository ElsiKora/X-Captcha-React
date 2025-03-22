import type { ILanguage } from "../../interface";

import { ELanguage } from "../../enum";

import { EN } from "./en";
import { RU } from "./ru";

/**
 * All available translations
 */
export const translations: Record<ELanguage, ILanguage> = {
	[ELanguage.EN]: EN,
	[ELanguage.RU]: RU,
};

export { EN } from "./en";
export { RU } from "./ru";
