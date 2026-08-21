import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsComplexNumberMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/complex-number",
  domain: "mathematics",
  key: "lesson.mathematics.complex-number",
  kind: "lesson",
  routeSlugs: {
    de: "komplexe-zahlen",
    en: "complex-number",
    id: "bilangan-kompleks",
  },
  sections: [
    {
      routeSlugs: {
        de: "addition-komplexer-zahlen",
        en: "addition-complex-numbers",
        id: "penjumlahan-bilangan-kompleks",
      },
      slug: "addition-complex-numbers",
    },
    {
      routeSlugs: {
        de: "grundidee-komplexer-zahlen",
        en: "complex-number-concept",
        id: "konsep-bilangan-kompleks",
      },
      slug: "complex-number-concept",
    },
    {
      routeSlugs: {
        de: "darstellungsformen-komplexer-zahlen",
        en: "complex-number-form",
        id: "bentuk-bilangan-kompleks",
      },
      slug: "complex-number-form",
    },
    {
      routeSlugs: {
        de: "konjugiert-komplexe-zahlen",
        en: "conjugate-complex-numbers",
        id: "konjugat-bilangan-kompleks",
      },
      slug: "conjugate-complex-numbers",
    },
    {
      routeSlugs: {
        de: "kehrwerte-komplexer-zahlen",
        en: "inverse-complex-numbers",
        id: "invers-bilangan-kompleks",
      },
      slug: "inverse-complex-numbers",
    },
    {
      routeSlugs: {
        de: "betrag-und-argument-komplexer-zahlen",
        en: "modulus-argument-complex-numbers",
        id: "modulus-dan-argumen-bilangan-kompleks",
      },
      slug: "modulus-argument-complex-numbers",
    },
    {
      routeSlugs: {
        de: "multiplikation-komplexer-zahlen",
        en: "multiplication-complex-numbers",
        id: "perkalian-bilangan-kompleks",
      },
      slug: "multiplication-complex-numbers",
    },
    {
      routeSlugs: {
        de: "hauptwert-des-arguments",
        en: "principal-argument-complex-numbers",
        id: "argumen-utama-bilangan-kompleks",
      },
      slug: "principal-argument-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-der-addition",
        en: "properties-addition-complex-numbers",
        id: "sifat-penjumlahan-bilangan-kompleks",
      },
      slug: "properties-addition-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-des-betrags",
        en: "properties-modulus-complex-numbers",
        id: "sifat-operasi-modulus-bilangan-kompleks",
      },
      slug: "properties-modulus-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-der-multiplikation",
        en: "properties-multiplication-complex-numbers",
        id: "sifat-perkalian-bilangan-kompleks",
      },
      slug: "properties-multiplication-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-des-hauptarguments",
        en: "properties-principal-argument-complex-numbers",
        id: "sifat-argumen-utama-bilangan-kompleks",
      },
      slug: "properties-principal-argument-complex-numbers",
    },
    {
      routeSlugs: {
        de: "skalare-multiplikation",
        en: "scalar-multiplication-complex-numbers",
        id: "perkalian-skalar-bilangan-kompleks",
      },
      slug: "scalar-multiplication-complex-numbers",
    },
  ],
  slug: "complex-number",
  translations: {
    de: {
      description: "Komplexe Zahlen algebraisch und polar darstellen.",
      title: "Komplexe Zahlen",
    },
    en: {
      description: "Add complex numbers with real-imaginary geometry.",
      title: "Complex Number",
    },
    id: {
      description: "Jumlahkan bilangan kompleks lewat geometri bidang.",
      title: "Bilangan Kompleks",
    },
  },
});
