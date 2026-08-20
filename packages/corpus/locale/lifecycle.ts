import {
  ACTIVE_APP_LOCALE_CODES,
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleCode,
  APP_LOCALE_CODES,
  type AppLocale,
  type AppLocaleCode,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Schema } from "effect";

/** Contract-supported locale code not yet eligible for signed publication. */
export type CandidateAppLocaleCode = Exclude<
  AppLocaleCode,
  ActiveAppLocaleCode
>;

const activeAppLocaleCodes: ReadonlySet<string> = new Set(
  ACTIVE_APP_LOCALE_CODES
);

/** Returns whether one supported locale is still outside active publication. */
function isCandidateAppLocaleCode(
  appLocale: AppLocaleCode
): appLocale is CandidateAppLocaleCode {
  return !activeAppLocaleCodes.has(appLocale);
}

/** Canonical candidate locale order derived from the owned candidate schema. */
export const CANDIDATE_APP_LOCALE_CODES = APP_LOCALE_CODES.filter(
  isCandidateAppLocaleCode
);

/** Candidate locales remain canonical and outside the current active set. */
function hasCanonicalCandidateAppLocales(locales: readonly AppLocale[]) {
  return (
    locales.length === CANDIDATE_APP_LOCALE_CODES.length &&
    locales.every(
      (appLocale, index) => appLocale === CANDIDATE_APP_LOCALE_CODES[index]
    )
  );
}

/** Exact possibly empty locale set admitted only for inactive authoring. */
export const CandidateAppLocaleListSchema = Schema.Array(AppLocaleSchema).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalCandidateAppLocales, {
      message:
        "Candidate app locales must equal the supported inactive locale set.",
    })
  ),
  Schema.brand("@NakafaAI/AksaraCandidateAppLocaleList")
);
export type CandidateAppLocaleList = typeof CandidateAppLocaleListSchema.Type;

/** Exact candidate locales derived from supported and active contracts. */
export const CANDIDATE_APP_LOCALES = Schema.decodeSync(
  CandidateAppLocaleListSchema
)(
  CANDIDATE_APP_LOCALE_CODES.map((appLocale) => AppLocaleSchema.make(appLocale))
);

/** Returns whether inactive authoring currently owns any locale. */
export function hasCandidateAppLocales() {
  return CANDIDATE_APP_LOCALES.length > 0;
}

/** Returns whether one app locale is currently eligible for signed publication. */
export function isActiveAppLocale(appLocale: AppLocale) {
  return ACTIVE_APP_LOCALES.some((active) => active === appLocale);
}
