import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";

import { localeOverlayAppLocaleCode } from "#corpus/locale/source";
import type { MaterialDomainDescriptor } from "#corpus/material/domain";
import { decodeMaterialLocaleCatalog } from "#corpus/material/locale";
import { composeMaterialLocaleCatalog } from "#corpus/material/locale-catalog";
import type { LessonMaterialSource } from "#corpus/material/schema";

/** Composes the material metadata required by selected curriculum locales. */
export const localizeCurriculumMaterials = Effect.fn(
  "AksaraCorpus.localizeCurriculumMaterials"
)(function* (input: {
  readonly appLocales: readonly AppLocale[];
  readonly domains: readonly MaterialDomainDescriptor[];
  readonly localeInput?: unknown;
  readonly materials: readonly LessonMaterialSource[];
}) {
  const needsLocaleOverlays = input.appLocales.some(
    (appLocale) => localeOverlayAppLocaleCode(appLocale) !== undefined
  );
  if (!needsLocaleOverlays) {
    return { domains: input.domains, materials: input.materials };
  }
  const catalog = yield* decodeMaterialLocaleCatalog(
    input.domains,
    input.localeInput
  );
  const localized = yield* composeMaterialLocaleCatalog({
    appLocales: input.appLocales,
    catalog,
    descriptors: input.domains,
    sources: input.materials,
  });
  return { domains: localized.domains, materials: localized.sources };
});
