import type { ProgramLocaleSourceInput } from "#corpus/program/locale";

/** Reviewed German title and route for every stable learning program. */
export const germanProgramLocaleSources = [
  {
    appLocale: "de",
    programKey: "merdeka",
    publicSlug: "merdeka",
    title: "Kurikulum Merdeka",
  },
  {
    appLocale: "de",
    programKey: "cambridge-international",
    publicSlug: "cambridge-international",
    title: "Cambridge International",
  },
  {
    appLocale: "de",
    programKey: "singapore-moe",
    publicSlug: "singapur-moe",
    title: "Singapore MOE",
  },
  {
    appLocale: "de",
    programKey: "united-states",
    publicSlug: "vereinigte-staaten",
    title: "US-amerikanischer Lernpfad nach Bildungsstandards",
  },
  {
    appLocale: "de",
    programKey: "tka",
    publicSlug: "tka",
    title: "TKA 2026",
  },
  {
    appLocale: "de",
    programKey: "snbt",
    publicSlug: "snbt",
    title: "SNBT 2026",
  },
] as const satisfies readonly ProgramLocaleSourceInput[];
