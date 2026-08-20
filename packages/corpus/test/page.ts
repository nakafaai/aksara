import type { PageLocaleSourceInput } from "#corpus/pages/locale";
import type { PageSourceInput } from "#corpus/pages/schema";

/** Representative public page source used across corpus contract tests. */
export function pageSource(
  values: Partial<PageSourceInput> = {}
): PageSourceInput {
  return {
    pageKey: "privacy-policy",
    publicPaths: { en: "privacy-policy", id: "privacy-policy" },
    sourceRoot: "pages/privacy-policy",
    ...values,
  };
}

/** Representative permanent German route for one public page source. */
export function germanPageSource(
  values: Partial<PageLocaleSourceInput> = {}
): PageLocaleSourceInput {
  return {
    appLocale: "de",
    pageKey: "privacy-policy",
    publicPath: "privacy-policy",
    ...values,
  };
}
