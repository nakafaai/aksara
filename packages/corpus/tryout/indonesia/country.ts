import type { CountrySourceInput } from "#corpus/tryout/schema";

/** Shared source-controlled identity for every Indonesian try-out exam. */
export const indonesiaTryoutCountry: CountrySourceInput = {
  countryCode: "ID",
  countryKey: "indonesia",
  countryOrder: 1,
  countryRevision: "2026-07-05",
  countryRouteSlugs: {
    de: "indonesien",
    en: "indonesia",
    id: "indonesia",
  },
  countryTranslations: {
    de: { title: "Indonesien" },
    en: { title: "Indonesia" },
    id: { title: "Indonesia" },
  },
};
