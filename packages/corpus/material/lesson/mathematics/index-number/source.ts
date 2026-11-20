import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/index-number",
  domain: "mathematics",
  key: "lesson.mathematics.index-number",
  kind: "lesson",
  routeSlugs: {
    en: "index-numbers",
    id: "angka-indeks",
    de: "indexzahlen",
    ms: "nombor-indeks",
  },
  sections: ["price-composite-index"],
  slug: "index-number",
  translations: {
    en: {
      description: "Work out price indices and weighted composites.",
      title: "Index Numbers",
    },
    id: {
      description: "Hitung indeks harga dan indeks gabungan berbobot.",
      title: "Angka Indeks",
    },
    de: {
      description: "Berechne Preisindizes und gewichtete Gesamtindizes.",
      title: "Indexzahlen",
    },
    ms: {
      description: "Kira indeks harga dan indeks gubahan berpemberat.",
      title: "Nombor Indeks",
    },
  },
};

export default lesson;
