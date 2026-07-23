import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsKinematicsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/kinematics",
  domain: "physics",
  key: "lesson.physics.kinematics",
  kind: "lesson",
  routeSlugs: { en: "kinematics", id: "kinematika" },
  sections: [
    {
      routeSlugs: { en: "acceleration", id: "percepatan" },
      slug: "acceleration",
      translations: {
        en: {
          title: "Acceleration",
        },
        id: {
          title: "Percepatan",
        },
      },
    },
    {
      routeSlugs: {
        en: "average-velocity-speed",
        id: "kecepatan-dan-kelajuan-rata-rata",
      },
      slug: "average-velocity-speed",
      translations: {
        en: {
          title: "Average Velocity and Average Speed",
        },
        id: {
          title: "Kecepatan dan Kelajuan Rata-Rata",
        },
      },
    },
    {
      routeSlugs: { en: "displacement-distance", id: "perpindahan-dan-jarak" },
      slug: "displacement-distance",
      translations: {
        en: {
          title: "Displacement and Distance",
        },
        id: {
          title: "Perpindahan dan Jarak",
        },
      },
    },
    {
      routeSlugs: {
        en: "instantaneous-velocity-speed",
        id: "kecepatan-dan-kelajuan-sesaat",
      },
      slug: "instantaneous-velocity-speed",
      translations: {
        en: {
          title: "Instantaneous Velocity and Speed",
        },
        id: {
          title: "Kecepatan dan Kelajuan Sesaat",
        },
      },
    },
    {
      routeSlugs: {
        en: "movement-position-change",
        id: "gerak-sebagai-perubahan-posisi",
      },
      slug: "movement-position-change",
      translations: {
        en: {
          title: "Motion as a Change in Position",
        },
        id: {
          title: "Gerak sebagai Perubahan Posisi",
        },
      },
    },
    {
      routeSlugs: {
        en: "non-uniform-linear-motion",
        id: "gerak-lurus-berubah-beraturan",
      },
      slug: "non-uniform-linear-motion",
      translations: {
        en: {
          title: "Uniformly Accelerated Linear Motion",
        },
        id: {
          title: "Gerak Lurus Berubah Beraturan",
        },
      },
    },
    {
      routeSlugs: { en: "parabolic-movement", id: "gerak-parabola" },
      slug: "parabolic-movement",
      translations: {
        en: {
          title: "Projectile Motion",
        },
        id: {
          title: "Gerak Parabola",
        },
      },
    },
    {
      routeSlugs: {
        en: "parabolic-movement-analysis",
        id: "analisis-gerak-parabola",
      },
      slug: "parabolic-movement-analysis",
      translations: {
        en: {
          title: "Projectile Motion Analysis",
        },
        id: {
          title: "Analisis Gerak Parabola",
        },
      },
    },
    {
      routeSlugs: {
        en: "reference-frame-position",
        id: "kerangka-acuan-dan-posisi",
      },
      slug: "reference-frame-position",
      translations: {
        en: {
          title: "Reference Frame and Position",
        },
        id: {
          title: "Kerangka Acuan dan Posisi",
        },
      },
    },
    {
      routeSlugs: { en: "relative-movement", id: "gerak-relatif" },
      slug: "relative-movement",
      translations: {
        en: {
          title: "Relative Motion",
        },
        id: {
          title: "Gerak Relatif",
        },
      },
    },
    {
      routeSlugs: { en: "stopping-distance", id: "jarak-henti" },
      slug: "stopping-distance",
      translations: {
        en: {
          title: "Stopping Distance",
        },
        id: {
          title: "Jarak Henti",
        },
      },
    },
    {
      routeSlugs: {
        en: "uniform-circular-motion",
        id: "gerak-melingkar-beraturan",
      },
      slug: "uniform-circular-motion",
      translations: {
        en: {
          title: "Uniform Circular Motion",
        },
        id: {
          title: "Gerak Melingkar Beraturan",
        },
      },
    },
    {
      routeSlugs: { en: "uniform-linear-motion", id: "gerak-lurus-beraturan" },
      slug: "uniform-linear-motion",
      translations: {
        en: {
          title: "Uniform Linear Motion",
        },
        id: {
          title: "Gerak Lurus Beraturan",
        },
      },
    },
    {
      routeSlugs: { en: "velocity-speed", id: "kecepatan-dan-kelajuan" },
      slug: "velocity-speed",
      translations: {
        en: {
          title: "Velocity and Speed",
        },
        id: {
          title: "Kecepatan dan Kelajuan",
        },
      },
    },
    {
      routeSlugs: { en: "vertical-movement", id: "gerak-vertikal" },
      slug: "vertical-movement",
      translations: {
        en: {
          title: "Vertical Motion",
        },
        id: {
          title: "Gerak Vertikal",
        },
      },
    },
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
  },
});
