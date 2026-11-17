import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/complex-number",
  domain: "mathematics",
  key: "lesson.mathematics.complex-number",
  kind: "lesson",
  routeSlugs: {
    en: "complex-number",
    id: "bilangan-kompleks",
    de: "komplexe-zahlen",
    ms: "nombor-kompleks",
  },
  sections: [
    "addition-complex-numbers",
    "complex-number-concept",
    "complex-number-form",
    "conjugate-complex-numbers",
    "inverse-complex-numbers",
    "modulus-argument-complex-numbers",
    "multiplication-complex-numbers",
    "principal-argument-complex-numbers",
    "properties-addition-complex-numbers",
    "properties-modulus-complex-numbers",
    "properties-multiplication-complex-numbers",
    "properties-principal-argument-complex-numbers",
    "scalar-multiplication-complex-numbers",
  ],
  slug: "complex-number",
  translations: {
    en: {
      description: "Add complex numbers with real-imaginary geometry.",
      title: "Complex Number",
    },
    id: {
      description: "Jumlahkan bilangan kompleks lewat geometri bidang.",
      title: "Bilangan Kompleks",
    },
    de: {
      description: "Komplexe Zahlen algebraisch und polar darstellen.",
      title: "Komplexe Zahlen",
    },
    ms: {
      description: "Tambah nombor kompleks dengan geometri nyata-khayalan.",
      title: "Nombor Kompleks",
    },
  },
};

export default lesson;
