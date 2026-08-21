import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsKinematicsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/kinematics",
  domain: "physics",
  key: "lesson.physics.kinematics",
  kind: "lesson",
  routeSlugs: { de: "kinematik", en: "kinematics", id: "kinematika" },
  sections: [
    {
      routeSlugs: {
        de: "beschleunigung",
        en: "acceleration",
        id: "percepatan",
      },
      slug: "acceleration",
    },
    {
      routeSlugs: {
        de: "mittlere-geschwindigkeit-und-schnelligkeit",
        en: "average-velocity-speed",
        id: "kecepatan-dan-kelajuan-rata-rata",
      },
      slug: "average-velocity-speed",
    },
    {
      routeSlugs: {
        de: "verschiebung-und-strecke",
        en: "displacement-distance",
        id: "perpindahan-dan-jarak",
      },
      slug: "displacement-distance",
    },
    {
      routeSlugs: {
        de: "momentangeschwindigkeit-und-momentschnelligkeit",
        en: "instantaneous-velocity-speed",
        id: "kecepatan-dan-kelajuan-sesaat",
      },
      slug: "instantaneous-velocity-speed",
    },
    {
      routeSlugs: {
        de: "bewegung-und-ortsaenderung",
        en: "movement-position-change",
        id: "gerak-sebagai-perubahan-posisi",
      },
      slug: "movement-position-change",
    },
    {
      routeSlugs: {
        de: "ungleichfoermige-geradlinige-bewegung",
        en: "non-uniform-linear-motion",
        id: "gerak-lurus-berubah-beraturan",
      },
      slug: "non-uniform-linear-motion",
    },
    {
      routeSlugs: {
        de: "parabelfoermige-bewegung",
        en: "parabolic-movement",
        id: "gerak-parabola",
      },
      slug: "parabolic-movement",
    },
    {
      routeSlugs: {
        de: "analyse-der-parabelfoermigen-bewegung",
        en: "parabolic-movement-analysis",
        id: "analisis-gerak-parabola",
      },
      slug: "parabolic-movement-analysis",
    },
    {
      routeSlugs: {
        de: "bezugssystem-und-position",
        en: "reference-frame-position",
        id: "kerangka-acuan-dan-posisi",
      },
      slug: "reference-frame-position",
    },
    {
      routeSlugs: {
        de: "relativbewegung",
        en: "relative-movement",
        id: "gerak-relatif",
      },
      slug: "relative-movement",
    },
    {
      routeSlugs: {
        de: "anhalteweg",
        en: "stopping-distance",
        id: "jarak-henti",
      },
      slug: "stopping-distance",
    },
    {
      routeSlugs: {
        de: "gleichfoermige-kreisbewegung",
        en: "uniform-circular-motion",
        id: "gerak-melingkar-beraturan",
      },
      slug: "uniform-circular-motion",
    },
    {
      routeSlugs: {
        de: "gleichfoermige-geradlinige-bewegung",
        en: "uniform-linear-motion",
        id: "gerak-lurus-beraturan",
      },
      slug: "uniform-linear-motion",
    },
    {
      routeSlugs: {
        de: "geschwindigkeit-und-schnelligkeit",
        en: "velocity-speed",
        id: "kecepatan-dan-kelajuan",
      },
      slug: "velocity-speed",
    },
    {
      routeSlugs: {
        de: "vertikale-bewegung",
        en: "vertical-movement",
        id: "gerak-vertikal",
      },
      slug: "vertical-movement",
    },
  ],
  slug: "kinematics",
  translations: {
    de: {
      description: "Bewegung mit Ort, Geschwindigkeit und Beschleunigung.",
      title: "Kinematik",
    },
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
