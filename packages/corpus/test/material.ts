import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, Schema } from "effect";
import type { LessonMaterialSource } from "#corpus/material/schema";
import { LessonMaterialSourceSchema } from "#corpus/material/schema";

/** Builds one exact lesson source so tests change one identity at a time. */
export function lessonMaterialSource() {
  return Schema.decodeSync(LessonMaterialSourceSchema)({
    assetRoot:
      "material/lesson/mathematics/function-composition-inverse-function",
    domain: "mathematics",
    key: "lesson.mathematics.function-composition-inverse-function",
    kind: "lesson",
    routeSlugs: {
      de: "funktionskomposition-und-umkehrfunktion",
      en: "function-composition-inverse-function",
      id: "fungsi-komposisi-dan-fungsi-invers",
    },
    sections: [
      {
        routeSlugs: {
          de: "funktionsbegriff",
          en: "function-concept",
          id: "konsep-fungsi",
        },
        slug: "function-concept",
      },
    ],
    slug: "function-composition-inverse-function",
    translations: {
      de: {
        description: "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
        title: "Funktionskomposition und Umkehrfunktion",
      },
      en: {
        description: "Operate on functions while tracking shared domains.",
        title: "Function Composition and Inverse Function",
      },
      id: {
        description: "Operasikan fungsi sambil menjaga domain bersama.",
        title: "Fungsi Komposisi dan Fungsi Invers",
      },
    },
  });
}

/** Builds one generic material source for cross-domain projection tests. */
export function earthScienceMaterialSource() {
  return Schema.decodeSync(LessonMaterialSourceSchema)({
    assetRoot: "material/lesson/earth-science/geology",
    domain: "earth-science",
    key: "lesson.earth-science.geology",
    kind: "lesson",
    routeSlugs: { en: "geology", id: "geologi" },
    sections: [
      {
        routeSlugs: { en: "rocks", id: "batuan" },
        slug: "rocks",
      },
    ],
    slug: "geology",
    translations: {
      en: { description: "Test geology.", title: "Geology" },
      id: { description: "Geologi pengujian.", title: "Geologi" },
    },
  });
}

/** Builds the expected signed graph identity for the representative lesson. */
function lessonMaterialGraph(locale: AppLocaleCode) {
  return {
    alignmentId:
      "alignment:material:lesson:mathematics:material-section:mathematics:function-composition-inverse-function:function-concept",
    assetId: `asset:${locale}:material:lesson:mathematics:material-section:mathematics:function-composition-inverse-function:function-concept`,
    conceptId:
      "concept:material:lesson:mathematics:function-composition-inverse-function",
    learningObjectId:
      "lo:material-section:mathematics:function-composition-inverse-function:function-concept",
    lensId: "lens:material:lesson:mathematics",
  };
}

/** Builds the exact embedded projections for the representative lesson. */
export function lessonMaterialEntries() {
  return [
    {
      assetRoot:
        "material/lesson/mathematics/function-composition-inverse-function",
      delivery: "public",
      rendererDomain: "mathematics",
      route: {
        appLocale: "en",
        artifactLocale: "en",
        contentKey:
          "material/lesson/mathematics/function-composition-inverse-function/function-concept",
        graph: lessonMaterialGraph("en"),
        materialKey: "lesson.mathematics.function-composition-inverse-function",
        order: 1,
        publicPath:
          "subjects/mathematics/function-composition-inverse-function/function-concept",
        sectionKey: "function-concept",
        topicTitle: "Function Composition and Inverse Function",
      },
      sourcePath:
        "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx",
    },
    {
      assetRoot:
        "material/lesson/mathematics/function-composition-inverse-function",
      delivery: "public",
      rendererDomain: "mathematics",
      route: {
        appLocale: "id",
        artifactLocale: "id",
        contentKey:
          "material/lesson/mathematics/function-composition-inverse-function/function-concept",
        graph: lessonMaterialGraph("id"),
        materialKey: "lesson.mathematics.function-composition-inverse-function",
        order: 1,
        publicPath:
          "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
        sectionKey: "function-concept",
        topicTitle: "Fungsi Komposisi dan Fungsi Invers",
      },
      sourcePath:
        "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx",
    },
  ];
}

/** Projects one present material display fixture through its source locale. */
export function materialDisplay(
  material: LessonMaterialSource,
  locale: AppLocaleCode
) {
  return Effect.gen(function* () {
    const routeSlug = yield* Effect.fromNullishOr(material.routeSlugs[locale]);
    const copy = yield* Effect.fromNullishOr(material.translations[locale]);
    return { routeSlug, title: copy.title };
  });
}

/** Finds one decoded material by its exact key, or fails when it is absent. */
export function findMaterial(
  materials: readonly LessonMaterialSource[],
  key: string
) {
  return Effect.fromOption(
    Arr.findFirst(materials, (material) => material.key === key)
  );
}
