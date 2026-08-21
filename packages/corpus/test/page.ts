import type { PageSourceInput } from "#corpus/pages/schema";

/** Representative public page source used across corpus contract tests. */
export function pageSource(
  values: Partial<PageSourceInput> = {}
): PageSourceInput {
  return {
    pageKey: "privacy-policy",
    publicPaths: {
      de: "privacy-policy",
      en: "privacy-policy",
      id: "privacy-policy",
    },
    sourceRoot: "pages/privacy-policy",
    ...values,
  };
}
