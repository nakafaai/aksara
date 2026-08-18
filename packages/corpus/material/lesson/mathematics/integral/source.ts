import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsIntegralMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/integral",
  domain: "mathematics",
  key: "lesson.mathematics.integral",
  kind: "lesson",
  routeSlugs: { en: "integral", id: "integral" },
  sections: [
    {
      routeSlugs: { en: "area-of-a-flat-surface", id: "luas-bidang-datar" },
      slug: "area-of-a-flat-surface",
    },
    {
      routeSlugs: { en: "definite-integral", id: "integral-tentu" },
      slug: "definite-integral",
    },
    {
      routeSlugs: {
        en: "definition-of-indefinite-integral",
        id: "definisi-integral-tak-tentu",
      },
      slug: "definition-of-indefinite-integral",
    },
    {
      routeSlugs: {
        en: "fundamental-theorem-of-calculus",
        id: "teorema-dasar-kalkulus",
      },
      slug: "fundamental-theorem-of-calculus",
    },
    {
      routeSlugs: {
        en: "integral-in-economics-and-business",
        id: "integral-dalam-bidang-ekonomi-dan-bisnis",
      },
      slug: "integral-in-economics-and-business",
    },
    {
      routeSlugs: {
        en: "integral-in-physics",
        id: "integral-dalam-bidang-fisika",
      },
      slug: "integral-in-physics",
    },
    {
      routeSlugs: {
        en: "properties-of-definite-integral",
        id: "sifat-sifat-integral-tentu",
      },
      slug: "properties-of-definite-integral",
    },
    {
      routeSlugs: {
        en: "properties-of-indefinite-integral",
        id: "sifat-sifat-integral-tak-tentu",
      },
      slug: "properties-of-indefinite-integral",
    },
    {
      routeSlugs: { en: "riemann-sum", id: "jumlahan-riemann" },
      slug: "riemann-sum",
    },
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
  },
});
