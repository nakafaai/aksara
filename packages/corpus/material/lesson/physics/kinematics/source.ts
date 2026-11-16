import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsKinematicsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/kinematics",
  domain: "physics",
  key: "lesson.physics.kinematics",
  kind: "lesson",
  routeSlugs: {
    de: "kinematik",
    en: "kinematics",
    id: "kinematika",
    ms: "kinematik",
  },
  sections: [
    {
      routeSlugs: {
        de: "beschleunigung",
        en: "acceleration",
        id: "percepatan",
        ms: "pecutan",
      },
      slug: "acceleration",
    },
    {
      routeSlugs: {
        de: "mittlere-geschwindigkeit-und-schnelligkeit",
        en: "average-velocity-speed",
        id: "kecepatan-dan-kelajuan-rata-rata",
        ms: "halaju-dan-laju-purata",
      },
      slug: "average-velocity-speed",
    },
    {
      routeSlugs: {
        de: "verschiebung-und-strecke",
        en: "displacement-distance",
        id: "perpindahan-dan-jarak",
        ms: "sesaran-dan-jarak",
      },
      slug: "displacement-distance",
    },
    {
      routeSlugs: {
        de: "momentangeschwindigkeit-und-momentschnelligkeit",
        en: "instantaneous-velocity-speed",
        id: "kecepatan-dan-kelajuan-sesaat",
        ms: "halaju-dan-laju-seketika",
      },
      slug: "instantaneous-velocity-speed",
    },
    {
      routeSlugs: {
        de: "bewegung-und-ortsaenderung",
        en: "movement-position-change",
        id: "gerak-sebagai-perubahan-posisi",
        ms: "gerakan-sebagai-perubahan-kedudukan",
      },
      slug: "movement-position-change",
    },
    {
      routeSlugs: {
        de: "ungleichfoermige-geradlinige-bewegung",
        en: "non-uniform-linear-motion",
        id: "gerak-lurus-berubah-beraturan",
        ms: "gerakan-linear-pecutan-seragam",
      },
      slug: "non-uniform-linear-motion",
    },
    {
      routeSlugs: {
        de: "parabelfoermige-bewegung",
        en: "parabolic-movement",
        id: "gerak-parabola",
        ms: "gerakan-projektil",
      },
      slug: "parabolic-movement",
    },
    {
      routeSlugs: {
        de: "analyse-der-parabelfoermigen-bewegung",
        en: "parabolic-movement-analysis",
        id: "analisis-gerak-parabola",
        ms: "analisis-gerakan-projektil",
      },
      slug: "parabolic-movement-analysis",
    },
    {
      routeSlugs: {
        de: "bezugssystem-und-position",
        en: "reference-frame-position",
        id: "kerangka-acuan-dan-posisi",
        ms: "kerangka-rujukan-dan-kedudukan",
      },
      slug: "reference-frame-position",
    },
    {
      routeSlugs: {
        de: "relativbewegung",
        en: "relative-movement",
        id: "gerak-relatif",
        ms: "gerakan-relatif",
      },
      slug: "relative-movement",
    },
    {
      evidenceUrls: [
        "https://highways.fhwa.dot.gov/safety/speed-management/guidelines-use-variable-speed-limit-systems-wet-weather/chapter-2-driver",
        "https://www.fhwa.dot.gov/publications/research/safety/04091/03.cfm",
        "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158",
        "https://www.mdpi.com/2075-1702/13/11/1005",
        "https://www.visualexpert.com/Resources/reactiontime.html",
      ],
      routeSlugs: {
        de: "anhalteweg",
        en: "stopping-distance",
        id: "jarak-henti",
        ms: "jarak-berhenti",
      },
      slug: "stopping-distance",
    },
    {
      routeSlugs: {
        de: "gleichfoermige-kreisbewegung",
        en: "uniform-circular-motion",
        id: "gerak-melingkar-beraturan",
        ms: "gerakan-membulat-seragam",
      },
      slug: "uniform-circular-motion",
    },
    {
      routeSlugs: {
        de: "gleichfoermige-geradlinige-bewegung",
        en: "uniform-linear-motion",
        id: "gerak-lurus-beraturan",
        ms: "gerakan-linear-seragam",
      },
      slug: "uniform-linear-motion",
    },
    {
      routeSlugs: {
        de: "geschwindigkeit-und-schnelligkeit",
        en: "velocity-speed",
        id: "kecepatan-dan-kelajuan",
        ms: "halaju-dan-laju",
      },
      slug: "velocity-speed",
    },
    {
      evidenceUrls: [
        "https://physics.nist.gov/cuu/pdf/sp811.pdf",
        "https://openstax.org/books/university-physics-volume-1/pages/3-5-free-fall",
      ],
      routeSlugs: {
        de: "vertikale-bewegung",
        en: "vertical-movement",
        id: "gerak-vertikal",
        ms: "gerakan-menegak",
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
    ms: {
      description: "Baca pecutan daripada jejak gerakan dan graf halaju.",
      title: "Kinematik",
    },
  },
});
