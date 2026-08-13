import {
  ACTIVE_APP_LOCALES,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import type { MaterialDomain } from "@nakafa/aksara-contracts/material/domain";
import { CurriculumNodeKeySchema } from "@nakafa/aksara-contracts/program/curriculum";
import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { Effect, Record as EffectRecord, Schema } from "effect";

import type {
  CurriculumMaterialNode,
  CurriculumNodeTranslationMapSchema,
  CurriculumSource,
} from "#corpus/curriculum/schema";
import {
  type MaterialDomainDescriptor,
  requireMaterialDomain,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";

/** One curriculum material mapping conflicts with reviewed source ownership. */
export class CurriculumProjectionError extends Schema.TaggedError<CurriculumProjectionError>()(
  "CurriculumProjectionError",
  {
    code: Schema.Literal("display", "domain", "material", "multi-material"),
    nodeKey: CurriculumNodeKeySchema,
    programKey: LearningProgramKeySchema,
    value: Schema.String,
  }
) {}

/** Reads source-owned translations for one validated material reference. */
function materialTranslations(material: LessonMaterialSource) {
  return EffectRecord.map(material.routeSlugs, (routeSlug, locale) => ({
    routeSlug,
    title: material.translations[locale].title,
  }));
}

/** Checks whether an override redundantly copies material-owned display data. */
function duplicatesMaterialDisplay(
  override: NonNullable<CurriculumMaterialNode["displayOverride"]>,
  material: LessonMaterialSource
) {
  const translations = materialTranslations(material);
  return ACTIVE_APP_LOCALES.every((appLocale) => {
    const appLocaleCode = activeAppLocaleCode(appLocale);
    return (
      override[appLocaleCode].routeSlug ===
        translations[appLocaleCode].routeSlug &&
      override[appLocaleCode].title === translations[appLocaleCode].title
    );
  });
}

/** Resolves one curriculum leaf through exact material and domain ownership. */
export const resolveCurriculumMaterial = Effect.fn(
  "AksaraCorpus.resolveCurriculumMaterial"
)(function* (
  curriculum: CurriculumSource,
  node: CurriculumMaterialNode,
  materialByKey: ReadonlyMap<string, LessonMaterialSource>,
  descriptors: readonly MaterialDomainDescriptor[],
  inheritedDomain: MaterialDomain | undefined
) {
  const [firstMaterialKey] = node.materialKeys;
  const firstMaterial = materialByKey.get(firstMaterialKey);
  if (!firstMaterial) {
    return yield* new CurriculumProjectionError({
      code: "material",
      nodeKey: node.key,
      programKey: curriculum.programKey,
      value: firstMaterialKey,
    });
  }

  const materials = [firstMaterial];
  for (const materialKey of node.materialKeys.slice(1)) {
    const material = materialByKey.get(materialKey);
    if (!material) {
      return yield* new CurriculumProjectionError({
        code: "material",
        nodeKey: node.key,
        programKey: curriculum.programKey,
        value: materialKey,
      });
    }
    materials.push(material);
  }

  const materialDomain = firstMaterial.domain;
  for (const material of materials) {
    yield* requireMaterialDomain(descriptors, material.domain, material.key);
    if (material.domain !== materialDomain) {
      return yield* new CurriculumProjectionError({
        code: "domain",
        nodeKey: node.key,
        programKey: curriculum.programKey,
        value: `${materialDomain}:${material.domain}`,
      });
    }
  }
  if (inheritedDomain && inheritedDomain !== materialDomain) {
    return yield* new CurriculumProjectionError({
      code: "domain",
      nodeKey: node.key,
      programKey: curriculum.programKey,
      value: `${inheritedDomain}:${materialDomain}`,
    });
  }

  let translations: typeof CurriculumNodeTranslationMapSchema.Type;
  if (materials.length > 1) {
    if (!node.displayOverride) {
      return yield* new CurriculumProjectionError({
        code: "multi-material",
        nodeKey: node.key,
        programKey: curriculum.programKey,
        value: node.materialKeys.join(","),
      });
    }
    translations = node.displayOverride;
  } else if (
    node.displayOverride &&
    duplicatesMaterialDisplay(node.displayOverride, firstMaterial)
  ) {
    return yield* new CurriculumProjectionError({
      code: "display",
      nodeKey: node.key,
      programKey: curriculum.programKey,
      value: firstMaterial.key,
    });
  } else {
    translations = node.displayOverride ?? materialTranslations(firstMaterial);
  }

  return { materialDomain, translations };
});
