import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCircleArcSectorMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/circle-arc-sector",
  domain: "mathematics",
  key: "lesson.mathematics.circle-arc-sector",
  kind: "lesson",
  routeSlugs: {
    de: "kreisboegen-und-kreissektoren",
    en: "circle-arc-sector",
    id: "busur-dan-juring-lingkaran",
  },
  sections: [
    {
      routeSlugs: { de: "bogen", en: "arc", id: "busur" },
      slug: "arc",
    },
    {
      routeSlugs: {
        de: "mittelpunktswinkel-ueber-einem-bogen",
        en: "central-angle-on-arc",
        id: "sudut-pusat-pada-busur",
      },
      slug: "central-angle-on-arc",
    },
    {
      routeSlugs: {
        de: "mittelpunktswinkel-im-kreissektor",
        en: "central-angle-on-sector",
        id: "sudut-pusat-pada-juring",
      },
      slug: "central-angle-on-sector",
    },
    {
      routeSlugs: { de: "sehne", en: "chord", id: "tali-busur" },
      slug: "chord",
    },
    {
      routeSlugs: { de: "kreisbogen", en: "circle-arc", id: "busur-lingkaran" },
      slug: "circle-arc",
    },
    {
      routeSlugs: {
        de: "kreissektor",
        en: "circle-sector",
        id: "juring-lingkaran",
      },
      slug: "circle-sector",
    },
    {
      routeSlugs: {
        de: "geschichte-der-kreiszahl-pi",
        en: "pi-history",
        id: "sejarah-nilai-pi",
      },
      slug: "pi-history",
    },
    {
      routeSlugs: {
        de: "bogenlaenge-und-sektorflaeche",
        en: "relationship-between-arc-length-and-sector-area",
        id: "hubungan-panjang-busur-dan-luas-juring",
      },
      slug: "relationship-between-arc-length-and-sector-area",
    },
    {
      routeSlugs: { de: "sektor", en: "sector", id: "juring" },
      slug: "sector",
    },
    {
      routeSlugs: { de: "kreissegment", en: "segment", id: "tembereng" },
      slug: "segment",
    },
  ],
  slug: "circle-arc-sector",
  translations: {
    de: {
      description: "Verbinde Bogenlänge, Mittelpunktswinkel und Fläche.",
      title: "Kreisbögen und Kreissektoren",
    },
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
