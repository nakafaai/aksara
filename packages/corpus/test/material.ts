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
