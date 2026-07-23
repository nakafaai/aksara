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
      translations: {
        en: {
          title: "Arc",
        },
        id: {
          title: "Busur",
        },
      },
    },
    {
      routeSlugs: { en: "central-angle-on-arc", id: "sudut-pusat-pada-busur" },
      slug: "central-angle-on-arc",
      translations: {
        en: {
          title: "Central Angle on Arc",
        },
        id: {
          title: "Sudut Pusat pada Busur",
        },
      },
    },
    {
      routeSlugs: {
        en: "central-angle-on-sector",
        id: "sudut-pusat-pada-juring",
      },
      slug: "central-angle-on-sector",
      translations: {
        en: {
          title: "Central Angle on Sector",
        },
        id: {
          title: "Sudut Pusat pada Juring",
        },
      },
    },
    {
      routeSlugs: { en: "chord", id: "tali-busur" },
      slug: "chord",
      translations: {
        en: {
          title: "Chord",
        },
        id: {
          title: "Tali Busur",
        },
      },
    },
    {
      routeSlugs: { en: "circle-arc", id: "busur-lingkaran" },
      slug: "circle-arc",
      translations: {
        en: {
          title: "Circle Arc",
        },
        id: {
          title: "Busur Lingkaran",
        },
      },
    },
    {
      routeSlugs: { en: "circle-sector", id: "juring-lingkaran" },
      slug: "circle-sector",
      translations: {
        en: {
          title: "Circle Sector",
        },
        id: {
          title: "Juring Lingkaran",
        },
      },
    },
    {
      routeSlugs: { en: "pi-history", id: "sejarah-nilai-pi" },
      slug: "pi-history",
      translations: {
        en: {
          title: "History of Pi",
        },
        id: {
          title: "Sejarah Nilai Pi",
        },
      },
    },
    {
      routeSlugs: {
        en: "relationship-between-arc-length-and-sector-area",
        id: "hubungan-panjang-busur-dan-luas-juring",
      },
      slug: "relationship-between-arc-length-and-sector-area",
      translations: {
        en: {
          title: "Relationship Between Arc Length and Sector Area",
        },
        id: {
          title: "Hubungan Panjang Busur dan Luas Juring",
        },
      },
    },
    {
      routeSlugs: { en: "sector", id: "juring" },
      slug: "sector",
      translations: {
        en: {
          title: "Sector",
        },
        id: {
          title: "Juring",
        },
      },
    },
    {
      routeSlugs: { en: "segment", id: "tembereng" },
      slug: "segment",
      translations: {
        en: {
          title: "Segment",
        },
        id: {
          title: "Tembereng",
        },
      },
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
