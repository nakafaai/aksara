import {
  mathematicsBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import {
  merdekaClass11ComplexNumberUnit,
  merdekaClass11FunctionModelingUnit,
  merdekaClass11GeometricTransformationUnit,
  merdekaClass11MatrixUnit,
  merdekaClass11PolynomialUnit,
} from "#corpus/curriculum/merdeka/topics/class-11/advanced";
import { merdekaClass11StatisticsRegressionUnit } from "#corpus/curriculum/merdeka/topics/class-11/statistics";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

export const merdekaClass11MathematicsTopicNodes = [
  unitNode({
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
    ],
    key: "class-11-mathematics-circle",
    materialCard: {
      de: {
        description: "Vergleiche Mittelpunkts- und Umfangswinkel.",
        title: "Kreis",
      },
      en: {
        description: "Relate central and inscribed angles.",
        title: "Circles",
      },
      id: {
        description: "Hubungkan sudut pusat dan keliling.",
        title: "Lingkaran",
      },
      ms: {
        description: "Kaitkan sudut di pusat dengan sudut di lilitan.",
        title: "Bulatan",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "kreis", title: "Kreis" },
      en: { routeSlug: "circle", title: "Circles" },
      id: { routeSlug: "lingkaran", title: "Lingkaran" },
      ms: { routeSlug: "bulatan", title: "Bulatan" },
    },
  }),
  merdekaClass11ComplexNumberUnit,
  unitNode({
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
        title: "Komposisi dan Invers Fungsi",
      },
      ms: {
        description: "Lakukan operasi pada fungsi dan domainnya.",
        title: "Fungsi Gubahan dan Fungsi Songsang",
      },
    },
    order: 30,
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
        routeSlug: "fungsi-komposisi-dan-fungsi-invers",
        title: "Komposisi dan Invers Fungsi",
      },
      ms: {
        routeSlug: "fungsi-gubahan-dan-fungsi-songsang",
        title: "Fungsi Gubahan dan Fungsi Songsang",
      },
    },
  }),
  merdekaClass11FunctionModelingUnit,
  merdekaClass11GeometricTransformationUnit,
  merdekaClass11MatrixUnit,
  merdekaClass11PolynomialUnit,
  merdekaClass11StatisticsRegressionUnit,
];
