import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { Schema } from "effect";

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
      en: "function-composition-inverse-function",
      id: "fungsi-komposisi-dan-fungsi-invers",
    },
    sections: [
      {
        routeSlugs: { en: "function-concept", id: "konsep-fungsi" },
        slug: "function-concept",
      },
    ],
    slug: "function-composition-inverse-function",
    translations: {
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
export function lessonMaterialGraph(locale: AppLocaleCode) {
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

/** Builds one locale-owned German overlay for the representative lesson. */
export function germanMaterialCatalog() {
  return {
    domains: [{ appLocale: "de", key: "mathematics", routeSlug: "mathematik" }],
    sources: [
      {
        appLocale: "de",
        materialKey: "lesson.mathematics.function-composition-inverse-function",
        routeSlug: "funktionskomposition-und-umkehrfunktion",
        sections: [
          { routeSlug: "funktionsbegriff", sectionKey: "function-concept" },
        ],
        translation: {
          description:
            "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
          title: "Funktionskomposition und Umkehrfunktion",
        },
      },
    ],
  } as const;
}
