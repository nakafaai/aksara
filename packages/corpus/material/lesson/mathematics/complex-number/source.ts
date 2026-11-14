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
    ms: "nombor-kompleks",
  },
  sections: [
    {
      routeSlugs: {
        de: "addition-komplexer-zahlen",
        en: "addition-complex-numbers",
        id: "penjumlahan-bilangan-kompleks",
        ms: "penambahan-nombor-kompleks",
      },
      slug: "addition-complex-numbers",
    },
    {
      routeSlugs: {
        de: "grundidee-komplexer-zahlen",
        en: "complex-number-concept",
        id: "konsep-bilangan-kompleks",
        ms: "konsep-nombor-kompleks",
      },
      slug: "complex-number-concept",
    },
    {
      routeSlugs: {
        de: "darstellungsformen-komplexer-zahlen",
        en: "complex-number-form",
        id: "bentuk-bilangan-kompleks",
        ms: "bentuk-nombor-kompleks",
      },
      slug: "complex-number-form",
    },
    {
      routeSlugs: {
        de: "konjugiert-komplexe-zahlen",
        en: "conjugate-complex-numbers",
        id: "konjugat-bilangan-kompleks",
        ms: "nombor-kompleks-konjugat",
      },
      slug: "conjugate-complex-numbers",
    },
    {
      routeSlugs: {
        de: "kehrwerte-komplexer-zahlen",
        en: "inverse-complex-numbers",
        id: "invers-bilangan-kompleks",
        ms: "songsangan-nombor-kompleks",
      },
      slug: "inverse-complex-numbers",
    },
    {
      routeSlugs: {
        de: "betrag-und-argument-komplexer-zahlen",
        en: "modulus-argument-complex-numbers",
        id: "modulus-dan-argumen-bilangan-kompleks",
        ms: "modulus-dan-hujah-nombor-kompleks",
      },
      slug: "modulus-argument-complex-numbers",
    },
    {
      routeSlugs: {
        de: "multiplikation-komplexer-zahlen",
        en: "multiplication-complex-numbers",
        id: "perkalian-bilangan-kompleks",
        ms: "pendaraban-nombor-kompleks",
      },
      slug: "multiplication-complex-numbers",
    },
    {
      routeSlugs: {
        de: "hauptwert-des-arguments",
        en: "principal-argument-complex-numbers",
        id: "argumen-utama-bilangan-kompleks",
        ms: "hujah-utama-nombor-kompleks",
      },
      slug: "principal-argument-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-der-addition",
        en: "properties-addition-complex-numbers",
        id: "sifat-penjumlahan-bilangan-kompleks",
        ms: "sifat-penambahan-nombor-kompleks",
      },
      slug: "properties-addition-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-des-betrags",
        en: "properties-modulus-complex-numbers",
        id: "sifat-operasi-modulus-bilangan-kompleks",
        ms: "sifat-modulus-nombor-kompleks",
      },
      slug: "properties-modulus-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-der-multiplikation",
        en: "properties-multiplication-complex-numbers",
        id: "sifat-perkalian-bilangan-kompleks",
        ms: "sifat-pendaraban-nombor-kompleks",
      },
      slug: "properties-multiplication-complex-numbers",
    },
    {
      routeSlugs: {
        de: "eigenschaften-des-hauptarguments",
        en: "properties-principal-argument-complex-numbers",
        id: "sifat-argumen-utama-bilangan-kompleks",
        ms: "sifat-hujah-utama-nombor-kompleks",
      },
      slug: "properties-principal-argument-complex-numbers",
    },
    {
      routeSlugs: {
        de: "skalare-multiplikation",
        en: "scalar-multiplication-complex-numbers",
        id: "perkalian-skalar-bilangan-kompleks",
        ms: "pendaraban-skalar-nombor-kompleks",
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
    ms: {
      description: "Tambah nombor kompleks dengan geometri nyata-khayalan.",
      title: "Nombor Kompleks",
    },
  },
});
