import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/integral",
  domain: "mathematics",
  key: "lesson.mathematics.integral",
  kind: "lesson",
  routeSlugs: {
    en: "integral",
    id: "integral",
    de: "integralrechnung",
    ms: "pengamiran",
  },
  sections: [
    "area-of-a-flat-surface",
    "definite-integral",
    "definition-of-indefinite-integral",
    "fundamental-theorem-of-calculus",
    "integral-in-economics-and-business",
    "integral-in-physics",
    "properties-of-definite-integral",
    "properties-of-indefinite-integral",
    "riemann-sum",
  ],
  slug: "integral",
  translations: {
    en: {
      description: "Find areas from definite integrals and curve bounds.",
      title: "Integrals",
    },
    id: {
      description: "Cari luas dari integral tentu dan batas kurva.",
      title: "Integral",
    },
    de: {
      description: "Berechne Flächen mit bestimmten Integralen.",
      title: "Integralrechnung",
    },
    ms: {
      description: "Cari luas daripada kamiran tentu dan sempadan lengkung.",
      title: "Pengamiran",
    },
  },
};

export default lesson;
