import { Schema } from "effect";

import {
  ACTIVE_APP_LOCALES,
  type AppLocale,
  type ArtifactLocale,
  ArtifactLocaleSchema,
  type DeliveryLanguage,
  DeliveryLanguageSchema,
} from "#contracts/locale";

/** Source-owned policy for the language presented by one assessment section. */
export const AssessmentLanguagePolicySchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("app-locale") }),
  Schema.Struct({
    kind: Schema.Literal("fixed"),
    language: DeliveryLanguageSchema,
  }),
]);
export type AssessmentLanguagePolicy =
  typeof AssessmentLanguagePolicySchema.Type;

/** Resolves one section's delivered language without inspecting its name. */
export function deliveryLanguageForPolicy(
  policy: AssessmentLanguagePolicy,
  appLocale: AppLocale
): DeliveryLanguage {
  return policy.kind === "fixed"
    ? policy.language
    : DeliveryLanguageSchema.make(appLocale);
}

/** Resolves the exact immutable question artifact locale for one app locale. */
export function questionArtifactLocaleForPolicy(
  policy: AssessmentLanguagePolicy,
  appLocale: AppLocale
): ArtifactLocale {
  return ArtifactLocaleSchema.make(
    deliveryLanguageForPolicy(policy, appLocale)
  );
}

/** Lists unique prompt and response locales required by one section policy. */
export function questionArtifactLocalesForPolicy(
  policy: AssessmentLanguagePolicy
) {
  return Object.freeze([
    ...new Set(
      ACTIVE_APP_LOCALES.map((appLocale) =>
        questionArtifactLocaleForPolicy(policy, appLocale)
      )
    ),
  ]);
}

/** Returns policy facts in stable field order for signed canonicalizers. */
export function canonicalAssessmentLanguagePolicy(
  policy: AssessmentLanguagePolicy
) {
  return policy.kind === "fixed"
    ? { kind: policy.kind, language: policy.language }
    : { kind: policy.kind };
}
