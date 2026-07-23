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
      translations: {
        en: {
          title: "Area of a Flat Surface",
        },
        id: {
          title: "Luas Bidang Datar",
        },
      },
    },
    {
      routeSlugs: { en: "definite-integral", id: "integral-tentu" },
      slug: "definite-integral",
      translations: {
        en: {
          title: "Definite Integral",
        },
        id: {
          title: "Integral Tentu",
        },
      },
    },
    {
      routeSlugs: {
        en: "definition-of-indefinite-integral",
        id: "definisi-integral-tak-tentu",
      },
      slug: "definition-of-indefinite-integral",
      translations: {
        en: {
          title: "Definition of Indefinite Integral",
        },
        id: {
          title: "Definisi Integral Tak Tentu",
        },
      },
    },
    {
      routeSlugs: {
        en: "fundamental-theorem-of-calculus",
        id: "teorema-dasar-kalkulus",
      },
      slug: "fundamental-theorem-of-calculus",
      translations: {
        en: {
          title: "Fundamental Theorem of Calculus",
        },
        id: {
          title: "Teorema Dasar Kalkulus",
        },
      },
    },
    {
      routeSlugs: {
        en: "integral-in-economics-and-business",
        id: "integral-dalam-bidang-ekonomi-dan-bisnis",
      },
      slug: "integral-in-economics-and-business",
      translations: {
        en: {
          title: "Integral in Economics and Business",
        },
        id: {
          title: "Integral dalam Bidang Ekonomi dan Bisnis",
        },
      },
    },
    {
      routeSlugs: {
        en: "integral-in-physics",
        id: "integral-dalam-bidang-fisika",
      },
      slug: "integral-in-physics",
      translations: {
        en: {
          title: "Integral in Physics",
        },
        id: {
          title: "Integral dalam Bidang Fisika",
        },
      },
    },
    {
      routeSlugs: {
        en: "properties-of-definite-integral",
        id: "sifat-sifat-integral-tentu",
      },
      slug: "properties-of-definite-integral",
      translations: {
        en: {
          title: "Properties of Definite Integral",
        },
        id: {
          title: "Sifat-Sifat Integral Tentu",
        },
      },
    },
    {
      routeSlugs: {
        en: "properties-of-indefinite-integral",
        id: "sifat-sifat-integral-tak-tentu",
      },
      slug: "properties-of-indefinite-integral",
      translations: {
        en: {
          title: "Properties of Indefinite Integral",
        },
        id: {
          title: "Sifat-Sifat Integral Tak Tentu",
        },
      },
    },
    {
      routeSlugs: { en: "riemann-sum", id: "jumlahan-riemann" },
      slug: "riemann-sum",
      translations: {
        en: {
          title: "Riemann Sum",
        },
        id: {
          title: "Jumlahan Riemann",
        },
      },
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
