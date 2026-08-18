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
    },
    {
      routeSlugs: {
        en: "average-velocity-speed",
        id: "kecepatan-dan-kelajuan-rata-rata",
      },
      slug: "average-velocity-speed",
    },
    {
      routeSlugs: { en: "displacement-distance", id: "perpindahan-dan-jarak" },
      slug: "displacement-distance",
    },
    {
      routeSlugs: {
        en: "instantaneous-velocity-speed",
        id: "kecepatan-dan-kelajuan-sesaat",
      },
      slug: "instantaneous-velocity-speed",
    },
    {
      routeSlugs: {
        en: "movement-position-change",
        id: "gerak-sebagai-perubahan-posisi",
      },
      slug: "movement-position-change",
    },
    {
      routeSlugs: {
        en: "non-uniform-linear-motion",
        id: "gerak-lurus-berubah-beraturan",
      },
      slug: "non-uniform-linear-motion",
    },
    {
      routeSlugs: { en: "parabolic-movement", id: "gerak-parabola" },
      slug: "parabolic-movement",
    },
    {
      routeSlugs: {
        en: "parabolic-movement-analysis",
        id: "analisis-gerak-parabola",
      },
      slug: "parabolic-movement-analysis",
    },
    {
      routeSlugs: {
        en: "reference-frame-position",
        id: "kerangka-acuan-dan-posisi",
      },
      slug: "reference-frame-position",
    },
    {
      routeSlugs: { en: "relative-movement", id: "gerak-relatif" },
      slug: "relative-movement",
    },
    {
      routeSlugs: { en: "stopping-distance", id: "jarak-henti" },
      slug: "stopping-distance",
    },
    {
      routeSlugs: {
        en: "uniform-circular-motion",
        id: "gerak-melingkar-beraturan",
      },
      slug: "uniform-circular-motion",
    },
    {
      routeSlugs: { en: "uniform-linear-motion", id: "gerak-lurus-beraturan" },
      slug: "uniform-linear-motion",
    },
    {
      routeSlugs: { en: "velocity-speed", id: "kecepatan-dan-kelajuan" },
      slug: "velocity-speed",
    },
    {
      routeSlugs: { en: "vertical-movement", id: "gerak-vertikal" },
      slug: "vertical-movement",
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
