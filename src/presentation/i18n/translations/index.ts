import type { ILanguage } from "../../interface";

import { ELanguage } from "../../enum";

import { AR } from "./ar";
import { BG } from "./bg";
import { CS } from "./cs";
import { DA } from "./da";
import { DE } from "./de";
import { EL } from "./el";
import { EN } from "./en";
import { ES } from "./es";
import { FI } from "./fi";
import { FR } from "./fr";
import { HE } from "./he";
import { HI } from "./hi";
import { HU } from "./hu";
import { ID } from "./id";
import { IT } from "./it";
import { JA } from "./ja";
import { KO } from "./ko";
import { NL } from "./nl";
import { NO } from "./no";
import { PL } from "./pl";
import { PT } from "./pt";
import { RO } from "./ro";
import { RU } from "./ru";
import { SK } from "./sk";
import { SV } from "./sv";
import { TH } from "./th";
import { TR } from "./tr";
import { UK } from "./uk";
import { VI } from "./vi";
import { ZH } from "./zh";

/**
 * All available translations
 */
export const translations: Record<ELanguage, ILanguage> = {
	[ELanguage.AR]: AR,
	[ELanguage.BG]: BG,
	[ELanguage.CS]: CS,
	[ELanguage.DA]: DA,
	[ELanguage.DE]: DE,
	[ELanguage.EL]: EL,
	[ELanguage.EN]: EN,
	[ELanguage.ES]: ES,
	[ELanguage.FI]: FI,
	[ELanguage.FR]: FR,
	[ELanguage.HE]: HE,
	[ELanguage.HI]: HI,
	[ELanguage.HU]: HU,
	[ELanguage.ID]: ID,
	[ELanguage.IT]: IT,
	[ELanguage.JA]: JA,
	[ELanguage.KO]: KO,
	[ELanguage.NL]: NL,
	[ELanguage.NO]: NO,
	[ELanguage.PL]: PL,
	[ELanguage.PT]: PT,
	[ELanguage.RO]: RO,
	[ELanguage.RU]: RU,
	[ELanguage.SK]: SK,
	[ELanguage.SV]: SV,
	[ELanguage.TH]: TH,
	[ELanguage.TR]: TR,
	[ELanguage.UK]: UK,
	[ELanguage.VI]: VI,
	[ELanguage.ZH]: ZH,
};

export { AR } from "./ar";
export { BG } from "./bg";
export { CS } from "./cs";
export { DA } from "./da";
export { DE } from "./de";
export { EL } from "./el";
export { EN } from "./en";
export { ES } from "./es";
export { FI } from "./fi";
export { FR } from "./fr";
export { HE } from "./he";
export { HI } from "./hi";
export { HU } from "./hu";
export { ID } from "./id";
export { IT } from "./it";
export { JA } from "./ja";
export { KO } from "./ko";
export { NL } from "./nl";
export { NO } from "./no";
export { PL } from "./pl";
export { PT } from "./pt";
export { RO } from "./ro";
export { RU } from "./ru";
export { SK } from "./sk";
export { SV } from "./sv";
export { TH } from "./th";
export { TR } from "./tr";
export { UK } from "./uk";
export { VI } from "./vi";
export { ZH } from "./zh";
