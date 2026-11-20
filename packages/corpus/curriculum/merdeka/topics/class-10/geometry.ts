import {
  mathematicsBookX,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Kurikulum Merdeka Kelas 10 Matematika, Bab 3 Perbandingan Trigonometri. */
export const merdekaClass10TrigonometricRatioUnit = unitNode({
  children: [
    materialNode({
      key: "class-10-mathematics-trigonometry-material",
      level: "lesson",
      materialKeys: ["lesson.mathematics.trigonometry"],
      order: 10,
      outcomes: [
        {
          code: "Matematika, Fase E, elemen Geometri",
          ...merdekaLearningOutcomes,
        },
        { code: "Bab 3 Perbandingan Trigonometri", ...mathematicsBookX },
      ],
    }),
  ],
  key: "class-10-mathematics-trigonometry",
  materialCard: {
    de: {
      description: "Ordne Dreiecksseiten den passenden Verhältnissen zu.",
      title: "Trigonometrische Verhältnisse",
    },
    en: {
      description: "Match triangle sides to ratios.",
      title: "Trigonometric Ratios",
    },
    id: {
      description: "Cocokkan sisi segitiga dengan rasio.",
      title: "Perbandingan Trigonometri",
    },
    ms: {
      description: "Padankan sisi segi tiga dengan nisbahnya.",
      title: "Nisbah Trigonometri",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "trigonometrische-verhaeltnisse",
      title: "Trigonometrische Verhältnisse",
    },
    en: { routeSlug: "trigonometric-ratios", title: "Trigonometric Ratios" },
    id: {
      routeSlug: "perbandingan-trigonometri",
      title: "Perbandingan Trigonometri",
    },
    ms: { routeSlug: "nisbah-trigonometri", title: "Nisbah Trigonometri" },
  },
});
