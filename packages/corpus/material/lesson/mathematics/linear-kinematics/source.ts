import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/linear-kinematics",
  domain: "mathematics",
  key: "lesson.mathematics.linear-kinematics",
  kind: "lesson",
  routeSlugs: {
    en: "kinematics-of-linear-motion",
    id: "kinematika-gerak-lurus",
    de: "kinematik-geradliniger-bewegung",
    ms: "kinematik-gerakan-linear",
  },
  sections: ["displacement-velocity-acceleration"],
  slug: "linear-kinematics",
  translations: {
    en: {
      description: "Differentiate displacement, integrate acceleration.",
      title: "Kinematics of Linear Motion",
    },
    id: {
      description: "Turunkan perpindahan, integralkan percepatan.",
      title: "Kinematika Gerak Lurus",
    },
    de: {
      description: "Leite Ort ab und integriere Beschleunigung.",
      title: "Kinematik geradliniger Bewegung",
    },
    ms: {
      description: "Bezakan sesaran dan kamirkan pecutan.",
      title: "Kinematik Gerakan Linear",
    },
  },
};

export default lesson;
