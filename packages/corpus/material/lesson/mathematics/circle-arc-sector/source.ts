import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCircleArcSectorMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/circle-arc-sector",
  domain: "mathematics",
  key: "lesson.mathematics.circle-arc-sector",
  kind: "lesson",
  routeSlugs: { en: "circle-arc-sector", id: "busur-dan-juring-lingkaran" },
  sections: [
    {
      routeSlugs: { en: "arc", id: "busur" },
      slug: "arc",
    },
    {
      routeSlugs: { en: "central-angle-on-arc", id: "sudut-pusat-pada-busur" },
      slug: "central-angle-on-arc",
    },
    {
      routeSlugs: {
        en: "central-angle-on-sector",
        id: "sudut-pusat-pada-juring",
      },
      slug: "central-angle-on-sector",
    },
    {
      routeSlugs: { en: "chord", id: "tali-busur" },
      slug: "chord",
    },
    {
      routeSlugs: { en: "circle-arc", id: "busur-lingkaran" },
      slug: "circle-arc",
    },
    {
      routeSlugs: { en: "circle-sector", id: "juring-lingkaran" },
      slug: "circle-sector",
    },
    {
      routeSlugs: { en: "pi-history", id: "sejarah-nilai-pi" },
      slug: "pi-history",
    },
    {
      routeSlugs: {
        en: "relationship-between-arc-length-and-sector-area",
        id: "hubungan-panjang-busur-dan-luas-juring",
      },
      slug: "relationship-between-arc-length-and-sector-area",
    },
    {
      routeSlugs: { en: "sector", id: "juring" },
      slug: "sector",
    },
    {
      routeSlugs: { en: "segment", id: "tembereng" },
      slug: "segment",
    },
  ],
  slug: "circle-arc-sector",
  translations: {
    en: {
      description: "Relate arc length, central angles, and sector area.",
      title: "Circle Arcs and Sectors",
    },
    id: {
      description: "Hubungkan busur, sudut pusat, dan luas juring.",
      title: "Busur dan Juring Lingkaran",
    },
  },
});
