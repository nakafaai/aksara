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
    },
    {
      routeSlugs: { en: "energy-conservation", id: "hukum-kekekalan-energi" },
      slug: "energy-conservation",
    },
    {
      routeSlugs: { en: "energy-forms", id: "bentuk-bentuk-energi" },
      slug: "energy-forms",
    },
    {
      routeSlugs: {
        en: "energy-impact",
        id: "dampak-eksplorasi-dan-penggunaan-energi",
      },
      slug: "energy-impact",
    },
    {
      routeSlugs: {
        en: "energy-solutions",
        id: "upaya-pemenuhan-kebutuhan-energi",
      },
      slug: "energy-solutions",
    },
    {
      routeSlugs: { en: "energy-sources", id: "sumber-energi" },
      slug: "energy-sources",
    },
    {
      routeSlugs: { en: "energy-transformation", id: "konversi-energi" },
      slug: "energy-transformation",
    },
    {
      routeSlugs: { en: "energy-urgency", id: "urgensi-isu-kebutuhan-energi" },
      slug: "energy-urgency",
    },
    {
      routeSlugs: {
        en: "non-renewable-sources",
        id: "sumber-energi-tak-terbarukan",
      },
      slug: "non-renewable-sources",
    },
    {
      routeSlugs: { en: "renewable-sources", id: "sumber-energi-terbarukan" },
      slug: "renewable-sources",
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
