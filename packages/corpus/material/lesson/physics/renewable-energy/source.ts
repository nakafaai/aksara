import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsRenewableEnergyMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/renewable-energy",
  domain: "physics",
  key: "lesson.physics.renewable-energy",
  kind: "lesson",
  routeSlugs: { en: "renewable-energy", id: "energi-terbarukan" },
  sections: [
    {
      routeSlugs: { en: "energy", id: "energi" },
      slug: "energy",
      translations: {
        en: {
          title: "Energy Concept",
        },
        id: {
          title: "Energi",
        },
      },
    },
    {
      routeSlugs: { en: "energy-conservation", id: "hukum-kekekalan-energi" },
      slug: "energy-conservation",
      translations: {
        en: {
          title: "Law of Energy Conservation",
        },
        id: {
          title: "Hukum Kekekalan Energi",
        },
      },
    },
    {
      routeSlugs: { en: "energy-forms", id: "bentuk-bentuk-energi" },
      slug: "energy-forms",
      translations: {
        en: {
          title: "Forms of Energy",
        },
        id: {
          title: "Bentuk-bentuk Energi",
        },
      },
    },
    {
      routeSlugs: {
        en: "energy-impact",
        id: "dampak-eksplorasi-dan-penggunaan-energi",
      },
      slug: "energy-impact",
      translations: {
        en: {
          title: "Impact of Energy Exploration and Use",
        },
        id: {
          title: "Dampak Eksplorasi dan Penggunaan Energi",
        },
      },
    },
    {
      routeSlugs: {
        en: "energy-solutions",
        id: "upaya-pemenuhan-kebutuhan-energi",
      },
      slug: "energy-solutions",
      translations: {
        en: {
          title: "Solutions to Meet Energy Demands",
        },
        id: {
          title: "Upaya Pemenuhan Kebutuhan Energi",
        },
      },
    },
    {
      routeSlugs: { en: "energy-sources", id: "sumber-energi" },
      slug: "energy-sources",
      translations: {
        en: {
          title: "Energy Sources",
        },
        id: {
          title: "Sumber Energi",
        },
      },
    },
    {
      routeSlugs: { en: "energy-transformation", id: "konversi-energi" },
      slug: "energy-transformation",
      translations: {
        en: {
          title: "Energy Transformation",
        },
        id: {
          title: "Konversi Energi",
        },
      },
    },
    {
      routeSlugs: { en: "energy-urgency", id: "urgensi-isu-kebutuhan-energi" },
      slug: "energy-urgency",
      translations: {
        en: {
          title: "Urgency of Energy Demand Issues",
        },
        id: {
          title: "Urgensi Isu Kebutuhan Energi",
        },
      },
    },
    {
      routeSlugs: {
        en: "non-renewable-sources",
        id: "sumber-energi-tak-terbarukan",
      },
      slug: "non-renewable-sources",
      translations: {
        en: {
          title: "Non-renewable Energy Sources",
        },
        id: {
          title: "Sumber Energi Tak Terbarukan",
        },
      },
    },
    {
      routeSlugs: { en: "renewable-sources", id: "sumber-energi-terbarukan" },
      slug: "renewable-sources",
      translations: {
        en: {
          title: "Renewable Energy Sources",
        },
        id: {
          title: "Sumber Energi Terbarukan",
        },
      },
    },
  ],
  slug: "renewable-energy",
  translations: {
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
