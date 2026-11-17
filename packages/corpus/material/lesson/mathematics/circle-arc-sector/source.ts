import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/circle-arc-sector",
  domain: "mathematics",
  key: "lesson.mathematics.circle-arc-sector",
  kind: "lesson",
  routeSlugs: {
    en: "circle-arc-sector",
    id: "busur-dan-juring-lingkaran",
    de: "kreisboegen-und-kreissektoren",
    ms: "lengkok-dan-sektor-bulatan",
  },
  sections: [
    "arc",
    "central-angle-on-arc",
    "central-angle-on-sector",
    "chord",
    "circle-arc",
    "circle-sector",
    "pi-history",
    "relationship-between-arc-length-and-sector-area",
    "sector",
    "segment",
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
    de: {
      description: "Verbinde Bogenlänge, Mittelpunktswinkel und Fläche.",
      title: "Kreisbögen und Kreissektoren",
    },
    ms: {
      description: "Kaitkan panjang lengkok, sudut pusat dan luas sektor.",
      title: "Lengkok dan Sektor Bulatan",
    },
  },
};

export default lesson;
