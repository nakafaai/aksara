import type { PageLocaleSourceInput } from "#corpus/pages/locale";

/** Every checked-in locale-owned public page route. */
export const pageLocaleSources: readonly PageLocaleSourceInput[] = [
  {
    appLocale: "de",
    pageKey: "imprint",
    publicPath: "impressum",
  },
  {
    appLocale: "de",
    pageKey: "privacy-policy",
    publicPath: "privacy-policy",
  },
  {
    appLocale: "de",
    pageKey: "security-policy",
    publicPath: "security-policy",
  },
  {
    appLocale: "de",
    pageKey: "terms-of-service",
    publicPath: "terms-of-service",
  },
];
