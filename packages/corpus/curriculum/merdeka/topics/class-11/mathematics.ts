import {
  mathematicsBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { merdekaClass11BivariateDataUnit } from "#corpus/curriculum/merdeka/topics/class-11/statistics";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 11 Matematika, Bab 2 Komposisi Fungsi dan Fungsi Invers. */
const merdekaClass11CompositionUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-function-composition-inverse-function-material",
      level: "lesson",
      materialKeys: [
        "lesson.mathematics.function-composition-inverse-function",
      ],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 2 Komposisi Fungsi dan Fungsi Invers",
          ...mathematicsBookXI,
        },
      ],
    }),
  ],
  key: "class-11-mathematics-function-composition-inverse-function",
  materialCard: {
    de: {
      description: "Verknüpfe Funktionen mit passenden Definitionsbereichen.",
      title: "Funktionskomposition und Umkehrfunktion",
    },
    en: {
      description: "Operate on functions and domains.",
      title: "Function Composition and Inverses",
    },
    id: {
      description: "Operasikan fungsi dan domainnya.",
      title: "Komposisi Fungsi dan Fungsi Invers",
    },
    ms: {
      description: "Lakukan operasi pada fungsi dan domainnya.",
      title: "Fungsi Gubahan dan Fungsi Songsang",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "funktionskomposition-und-umkehrfunktion",
      title: "Funktionskomposition und Umkehrfunktion",
    },
    en: {
      routeSlug: "function-composition-inverse-function",
      title: "Function Composition and Inverses",
    },
    id: {
      routeSlug: "komposisi-fungsi-dan-fungsi-invers",
      title: "Komposisi Fungsi dan Fungsi Invers",
    },
    ms: {
      routeSlug: "fungsi-gubahan-dan-fungsi-songsang",
      title: "Fungsi Gubahan dan Fungsi Songsang",
    },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika, Bab 3 Transformasi Fungsi. */
const merdekaClass11FunctionTransformationUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-function-transformation-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.function-transformation"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Aljabar dan Fungsi",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 3 Transformasi Fungsi", ...mathematicsBookXI },
      ],
    }),
  ],
  key: "class-11-mathematics-function-transformation",
  materialCard: {
    de: {
      description: "Verschiebe, strecke und spiegle Funktionsgraphen.",
      title: "Funktionstransformationen",
    },
    en: {
      description: "Shift, stretch, and reflect function graphs.",
      title: "Function Transformations",
    },
    id: {
      description: "Geser, regang, dan cerminkan grafik fungsi.",
      title: "Transformasi Fungsi",
    },
    ms: {
      description: "Gerakkan, regangkan dan pantulkan graf fungsi.",
      title: "Transformasi Fungsi",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "funktionstransformationen",
      title: "Funktionstransformationen",
    },
    en: {
      routeSlug: "function-transformation",
      title: "Function Transformations",
    },
    id: { routeSlug: "transformasi-fungsi", title: "Transformasi Fungsi" },
    ms: { routeSlug: "transformasi-fungsi", title: "Transformasi Fungsi" },
  },
});

/** Kurikulum Merdeka Kelas 11 Matematika, Bab 4 Lingkaran, with arcs and sectors (Bab 4A). */
const merdekaClass11CircleUnit = unitNode({
  children: [
    materialNode({
      key: "class-11-mathematics-circle-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Geometri",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 4 Lingkaran", ...mathematicsBookXI },
      ],
    }),
    materialNode({
      key: "class-11-mathematics-circle-arc-sector-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle-arc-sector"],
      order: 20,
      outcomes: [
        {
          code: "Matematika, Fase F, elemen Geometri",
          ...merdekaLearningOutcomes,
        },
        {
          code: "Bab 4 Lingkaran, A Lingkaran dan Busur Lingkaran",
          ...mathematicsBookXI,
        },
      ],
    }),
  ],
  key: "class-11-mathematics-circle",
  materialCard: {
    de: {
      description: "Verbinde Winkel, Bögen und Sektoren am Kreis.",
      title: "Kreis",
    },
    en: {
      description: "Relate angles, arcs, and sectors of circles.",
      title: "Circles",
    },
    id: {
      description: "Hubungkan sudut, busur, dan juring lingkaran.",
      title: "Lingkaran",
    },
    ms: {
      description: "Kaitkan sudut, lengkok dan sektor bulatan.",
      title: "Bulatan",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "kreis", title: "Kreis" },
    en: { routeSlug: "circle", title: "Circles" },
    id: { routeSlug: "lingkaran", title: "Lingkaran" },
    ms: { routeSlug: "bulatan", title: "Bulatan" },
  },
});

/** The units of Kelas 11 Matematika, in the chapter order of its revised book. */
export const merdekaClass11MathematicsTopicNodes = [
  merdekaClass11BivariateDataUnit,
  merdekaClass11CompositionUnit,
  merdekaClass11FunctionTransformationUnit,
  merdekaClass11CircleUnit,
];
