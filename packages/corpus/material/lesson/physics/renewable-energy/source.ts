import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsRenewableEnergyMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/renewable-energy",
  domain: "physics",
  key: "lesson.physics.renewable-energy",
  kind: "lesson",
  routeSlugs: {
    de: "erneuerbare-energien",
    en: "renewable-energy",
    id: "energi-terbarukan",
  },
  sections: [
    {
      routeSlugs: { de: "energie", en: "energy", id: "energi" },
      slug: "energy",
    },
    {
      routeSlugs: {
        de: "energieerhaltung",
        en: "energy-conservation",
        id: "hukum-kekekalan-energi",
      },
      slug: "energy-conservation",
    },
    {
      routeSlugs: {
        de: "energieformen",
        en: "energy-forms",
        id: "bentuk-bentuk-energi",
      },
      slug: "energy-forms",
    },
    {
      routeSlugs: {
        de: "auswirkungen-der-energienutzung",
        en: "energy-impact",
        id: "dampak-eksplorasi-dan-penggunaan-energi",
      },
      slug: "energy-impact",
    },
    {
      routeSlugs: {
        de: "loesungen-fuer-die-energieversorgung",
        en: "energy-solutions",
        id: "upaya-pemenuhan-kebutuhan-energi",
      },
      slug: "energy-solutions",
    },
    {
      routeSlugs: {
        de: "energiequellen",
        en: "energy-sources",
        id: "sumber-energi",
      },
      slug: "energy-sources",
    },
    {
      routeSlugs: {
        de: "energieumwandlung",
        en: "energy-transformation",
        id: "konversi-energi",
      },
      slug: "energy-transformation",
    },
    {
      routeSlugs: {
        de: "dringlichkeit-der-energiewende",
        en: "energy-urgency",
        id: "urgensi-isu-kebutuhan-energi",
      },
      slug: "energy-urgency",
    },
    {
      routeSlugs: {
        de: "nichterneuerbare-energiequellen",
        en: "non-renewable-sources",
        id: "sumber-energi-tak-terbarukan",
      },
      slug: "non-renewable-sources",
    },
    {
      routeSlugs: {
        de: "erneuerbare-energiequellen",
        en: "renewable-sources",
        id: "sumber-energi-terbarukan",
      },
      slug: "renewable-sources",
    },
  ],
  slug: "renewable-energy",
  translations: {
    de: {
      description: "Verbinde Energie, Arbeit, Leistung und Stromverbrauch.",
      title: "Erneuerbare Energien",
    },
    en: {
      description: "Connect energy, work, power, and electricity use.",
      title: "Renewable Energy",
    },
    id: {
      description: "Hubungkan energi, usaha, daya, dan listrik harian.",
      title: "Energi Terbarukan",
    },
  },
});
