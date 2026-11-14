import type { CountrySourceInput } from "#corpus/tryout/schema";

/** Shared source-controlled identity for every German try-out exam. */
export const germanyTryoutCountry: CountrySourceInput = {
  countryCode: "DE",
  countryKey: "germany",
  countryOrder: 2,
  countryRevision: "2026-11-08",
  countryRouteSlugs: {
    de: "deutschland",
    en: "germany",
    id: "jerman",
    ms: "jerman",
  },
  countryTranslations: {
    de: { title: "Deutschland" },
    en: { title: "Germany" },
    id: { title: "Jerman" },
    ms: { title: "Jerman" },
  },
};
