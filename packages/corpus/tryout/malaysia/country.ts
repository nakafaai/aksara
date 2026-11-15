import type { CountrySourceInput } from "#corpus/tryout/schema";

/** Shared source-controlled identity for every Malaysian try-out exam. */
export const malaysiaTryoutCountry: CountrySourceInput = {
  countryCode: "MY",
  countryKey: "malaysia",
  countryOrder: 3,
  countryRevision: "2026-11-15",
  countryRouteSlugs: {
    de: "malaysia",
    en: "malaysia",
    id: "malaysia",
    ms: "malaysia",
  },
  countryTranslations: {
    de: { title: "Malaysia" },
    en: { title: "Malaysia" },
    id: { title: "Malaysia" },
    ms: { title: "Malaysia" },
  },
};
