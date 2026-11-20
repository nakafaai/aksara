import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/kinematics",
  domain: "physics",
  key: "lesson.physics.kinematics",
  kind: "lesson",
  routeSlugs: {
    en: "kinematics",
    id: "kinematika",
    de: "kinematik",
    ms: "kinematik",
  },
  sections: [
    "acceleration",
    "average-velocity-speed",
    "displacement-distance",
    "instantaneous-velocity-speed",
    "movement-position-change",
    "non-uniform-linear-motion",
    "parabolic-movement",
    "parabolic-movement-analysis",
    "reference-frame-position",
    "relative-movement",
    "stopping-distance",
    "uniform-circular-motion",
    "uniform-linear-motion",
    "velocity-speed",
    "vertical-movement",
  ],
  slug: "kinematics",
  translations: {
    en: {
      description: "Read acceleration from traces and velocity graphs.",
      title: "Kinematics",
    },
    id: {
      description: "Baca percepatan dari jejak gerak dan grafik kecepatan.",
      title: "Kinematika",
    },
    de: {
      description: "Bewegung mit Ort, Geschwindigkeit und Beschleunigung.",
      title: "Kinematik",
    },
    ms: {
      description: "Baca pecutan daripada jejak gerakan dan graf halaju.",
      title: "Kinematik",
    },
  },
};

export default lesson;
