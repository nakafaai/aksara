import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/thermochemistry",
  domain: "chemistry",
  key: "lesson.chemistry.thermochemistry",
  kind: "lesson",
  routeSlugs: {
    en: "thermochemistry",
    id: "termokimia",
    de: "thermochemie",
    ms: "termokimia",
  },
  sections: ["heat-of-reaction"],
  slug: "thermochemistry",
  translations: {
    en: {
      description: "Calculate heats of reaction and compare fuels.",
      title: "Thermochemistry",
    },
    id: {
      description: "Hitung kalor reaksi dan bandingkan bahan bakar.",
      title: "Termokimia",
    },
    de: {
      description: "Berechne Reaktionswärmen und vergleiche Brennstoffe.",
      title: "Thermochemie",
    },
    ms: {
      description: "Kira haba tindak balas dan bandingkan bahan api.",
      title: "Termokimia",
    },
  },
};

export default lesson;
