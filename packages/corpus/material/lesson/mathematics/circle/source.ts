import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/circle",
  domain: "mathematics",
  key: "lesson.mathematics.circle",
  kind: "lesson",
  routeSlugs: {
    en: "circle",
    id: "lingkaran",
    de: "kreisgeometrie",
    ms: "bulatan",
  },
  sections: [
    "central-angle-and-inscribed-angle",
    "circle-and-arc-circle",
    "circle-and-chord",
    "circle-and-tangent-line",
    "external-tangent-line-and-internal-tangent-line",
    "properties-of-angle-in-circle",
  ],
  slug: "circle",
  translations: {
    en: {
      description: "Relate central and inscribed angles in circles.",
      title: "Circle",
    },
    id: {
      description: "Hubungkan sudut pusat dan keliling pada lingkaran.",
      title: "Lingkaran",
    },
    de: {
      description: "Vergleiche Mittel- und Umfangswinkel am Kreis.",
      title: "Kreisgeometrie",
    },
    ms: {
      description: "Kaitkan sudut di pusat dengan sudut di lilitan.",
      title: "Bulatan",
    },
  },
};

export default lesson;
