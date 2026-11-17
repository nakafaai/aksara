import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/coordinate-geometry",
  domain: "mathematics",
  key: "lesson.mathematics.coordinate-geometry",
  kind: "lesson",
  routeSlugs: {
    en: "coordinate-geometry",
    id: "geometri-koordinat",
    de: "koordinatengeometrie",
    ms: "geometri-koordinat",
  },
  sections: ["divisor-area-locus"],
  slug: "coordinate-geometry",
  translations: {
    en: {
      description: "Divide segments, find areas and build loci.",
      title: "Coordinate Geometry",
    },
    id: {
      description: "Bagi ruas garis, hitung luas, dan susun lokus.",
      title: "Geometri Koordinat",
    },
    de: {
      description: "Teile Strecken, berechne Flächen, finde Ortslinien.",
      title: "Koordinatengeometrie",
    },
    ms: {
      description: "Bahagi tembereng, kira luas dan bina lokus.",
      title: "Geometri Koordinat",
    },
  },
};

export default lesson;
