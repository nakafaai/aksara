import {
  APP_LOCALE_CODES,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import type { MaterialDomain } from "@nakafa/aksara-contracts/material/domain";
import { CurriculumNodeKeySchema } from "@nakafa/aksara-contracts/program/curriculum";
import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";
import type {
  CurriculumMaterialNode,
  CurriculumSource,
  LocalizedCurriculumNodeTranslationMapSchema,
} from "#corpus/curriculum/schema";
import {
  addLocalizedSource,
  LOCALE_OVERLAY_APP_LOCALE_ENTRIES,
  sourceLocaleValue,
} from "#corpus/locale/source";
import {
  type MaterialDomainDescriptor,
  requireMaterialDomain,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";

/** One curriculum material mapping conflicts with reviewed source ownership. */
export class CurriculumProjectionError extends Schema.TaggedError<CurriculumProjectionError>()(
  "CurriculumProjectionError",
  {
    code: Schema.Literals(["display", "domain", "material", "multi-material"]),
    nodeKey: CurriculumNodeKeySchema,
    programKey: LearningProgramKeySchema,
    value: Schema.String,
  }
) {}

/** Reads source-owned translations for one validated material reference. */
const materialTranslations = Effect.fn("AksaraCorpus.materialTranslations")(
  function* (
    material: LessonMaterialSource,
    nodeKey: CurriculumProjectionError["nodeKey"],
    programKey: CurriculumProjectionError["programKey"]
  ) {
    let translations: typeof LocalizedCurriculumNodeTranslationMapSchema.Type =
      {
        en: {
          routeSlug: material.routeSlugs.en,
          title: material.translations.en.title,
        },
        id: {
          routeSlug: material.routeSlugs.id,
          title: material.translations.id.title,
        },
      };
    for (const { appLocale } of LOCALE_OVERLAY_APP_LOCALE_ENTRIES) {
      const routeSlug = sourceLocaleValue(material.routeSlugs, appLocale);
      const translation = sourceLocaleValue(material.translations, appLocale);
      if ((routeSlug === undefined) !== (translation === undefined)) {
        return yield* new CurriculumProjectionError({
          code: "display",
          nodeKey,
          programKey,
          value: material.key,
        });
      }
      if (routeSlug !== undefined && translation !== undefined) {
        translations = addLocalizedSource(translations, appLocale, {
          routeSlug,
          title: translation.title,
        });
      }
    }
    return translations;
  }
);

/** Checks whether an override redundantly copies material-owned display data. */
const duplicatesMaterialDisplay = Effect.fn(
  "AksaraCorpus.duplicatesMaterialDisplay"
)(function* (
  override: NonNullable<CurriculumMaterialNode["displayOverride"]>,
  material: LessonMaterialSource,
  nodeKey: CurriculumProjectionError["nodeKey"],
  programKey: CurriculumProjectionError["programKey"]
) {
  const translations = yield* materialTranslations(
    material,
    nodeKey,
    programKey
  );
  return APP_LOCALE_CODES.every((code) => {
    const appLocale = AppLocaleSchema.make(code);
    const overrideCopy = sourceLocaleValue(override, appLocale);
    if (overrideCopy === undefined) {
      return true;
    }
    const materialCopy = sourceLocaleValue(translations, appLocale);
    return (
      overrideCopy.routeSlug === materialCopy?.routeSlug &&
      overrideCopy.title === materialCopy?.title
    );
  });
});

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

  let translations: typeof LocalizedCurriculumNodeTranslationMapSchema.Type;
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
    (yield* duplicatesMaterialDisplay(
      node.displayOverride,
      firstMaterial,
      node.key,
      curriculum.programKey
    ))
  ) {
    return yield* new CurriculumProjectionError({
      code: "display",
      nodeKey: node.key,
      programKey: curriculum.programKey,
      value: firstMaterial.key,
    });
  } else {
    translations =
      node.displayOverride ??
      (yield* materialTranslations(
        firstMaterial,
        node.key,
        curriculum.programKey
      ));
  }

  return { materialDomain, translations };
});
