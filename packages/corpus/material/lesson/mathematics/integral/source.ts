import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsIntegralMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/integral",
  domain: "mathematics",
  key: "lesson.mathematics.integral",
  kind: "lesson",
  routeSlugs: { de: "integralrechnung", en: "integral", id: "integral" },
  sections: [
    {
      routeSlugs: {
        de: "flaecheninhalt",
        en: "area-of-a-flat-surface",
        id: "luas-bidang-datar",
      },
      slug: "area-of-a-flat-surface",
    },
    {
      routeSlugs: {
        de: "bestimmtes-integral",
        en: "definite-integral",
        id: "integral-tentu",
      },
      slug: "definite-integral",
    },
    {
      routeSlugs: {
        de: "definition-des-unbestimmten-integrals",
        en: "definition-of-indefinite-integral",
        id: "definisi-integral-tak-tentu",
      },
      slug: "definition-of-indefinite-integral",
    },
    {
      routeSlugs: {
        de: "hauptsatz-der-differential-und-integralrechnung",
        en: "fundamental-theorem-of-calculus",
        id: "teorema-dasar-kalkulus",
      },
      slug: "fundamental-theorem-of-calculus",
    },
    {
      routeSlugs: {
        de: "integrale-in-wirtschaft-und-oekonomie",
        en: "integral-in-economics-and-business",
        id: "integral-dalam-bidang-ekonomi-dan-bisnis",
      },
      slug: "integral-in-economics-and-business",
    },
    {
      routeSlugs: {
        de: "integrale-in-der-physik",
        en: "integral-in-physics",
        id: "integral-dalam-bidang-fisika",
      },
      slug: "integral-in-physics",
    },
    {
      routeSlugs: {
        de: "eigenschaften-bestimmter-integrale",
        en: "properties-of-definite-integral",
        id: "sifat-sifat-integral-tentu",
      },
      slug: "properties-of-definite-integral",
    },
    {
      routeSlugs: {
        de: "eigenschaften-unbestimmter-integrale",
        en: "properties-of-indefinite-integral",
        id: "sifat-sifat-integral-tak-tentu",
      },
      slug: "properties-of-indefinite-integral",
    },
    {
      routeSlugs: {
        de: "riemann-summen",
        en: "riemann-sum",
        id: "jumlahan-riemann",
      },
      slug: "riemann-sum",
    },
  ],
  slug: "integral",
  translations: {
    de: {
      description: "Berechne Flächen mit bestimmten Integralen.",
      title: "Integralrechnung",
    },
    en: {
      description: "Find areas from definite integrals and curve bounds.",
      title: "Integrals",
    },
    id: {
      description: "Cari luas dari integral tentu dan batas kurva.",
      title: "Integral",
    },
  },
});
