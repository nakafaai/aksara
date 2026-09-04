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
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/what-is-energy/",
        "https://www.nist.gov/pml/special-publication-330/sp-330-section-2",
        "https://www.nist.gov/glossary-term/26261",
        "https://www.eia.gov/energyexplained/renewable-sources/",
        "https://www.iea.org/reports/renewables-2023/executive-summary",
      ],
      routeSlugs: { de: "energie", en: "energy", id: "energi" },
      slug: "energy",
    },
    {
      evidenceUrls: [
        "https://www.energy.gov/cmei/water/how-hydropower-works",
        "https://www.energy.gov/cmei/systems/solar-performance-and-efficiency",
      ],
      routeSlugs: {
        de: "energieerhaltung",
        en: "energy-conservation",
        id: "hukum-kekekalan-energi",
      },
      slug: "energy-conservation",
    },
    {
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/what-is-energy/forms-of-energy.php",
      ],
      routeSlugs: {
        de: "energieformen",
        en: "energy-forms",
        id: "bentuk-bentuk-energi",
      },
      slug: "energy-forms",
    },
    {
      evidenceUrls: [
        "https://www.epa.gov/energy/about-us-electricity-system-and-its-impact-environment",
        "https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php",
        "https://science.nasa.gov/earth/earth-observatory/climate-and-earths-energy-budget/",
        "https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions",
        "https://www.eia.gov/energyexplained/coal/coal-and-the-environment.php",
      ],
      routeSlugs: {
        de: "auswirkungen-der-energienutzung",
        en: "energy-impact",
        id: "dampak-eksplorasi-dan-penggunaan-energi",
      },
      slug: "energy-impact",
    },
    {
      evidenceUrls: [
        "https://www.energy.gov/cmei/water/how-hydropower-works",
        "https://paitonenergy.com/en/energy-learning-house-program-for-climate-change-mitigation/",
        "https://www.iea.org/energy-system/energy-efficiency-and-demand/energy-efficiency",
        "https://sdgs.un.org/2030agenda",
        "https://sdgs.un.org/goals/goal7",
      ],
      routeSlugs: {
        de: "loesungen-fuer-die-energieversorgung",
        en: "energy-solutions",
        id: "upaya-pemenuhan-kebutuhan-energi",
      },
      slug: "energy-solutions",
    },
    {
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/what-is-energy/sources-of-energy.php",
        "https://www.eia.gov/energyexplained/renewable-sources/",
        "https://www.epa.gov/anaerobic-digestion/basic-information-about-anaerobic-digestion",
        "https://www.eia.gov/energyexplained/solar/photovoltaics-and-electricity.php",
        "https://www.energy.gov/cmei/water/marine-energy-basics",
        "https://www.energy.gov/hgeo/geothermal/geothermal-basics",
        "https://www.esdm.go.id/en/media-center/news-archives/miliki-potensi-ebt-3686-gw-sekjen-rida-modal-utama-jalankan-transisi-energi-indonesia",
      ],
      routeSlugs: {
        de: "energiequellen",
        en: "energy-sources",
        id: "sumber-energi",
      },
      slug: "energy-sources",
    },
    {
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/what-is-energy/laws-of-energy.php",
        "https://www.energy.gov/cmei/water/how-hydropower-works",
        "https://www.energy.gov/cmei/systems/how-do-wind-turbines-work",
        "https://www.eia.gov/energyexplained/solar/photovoltaics-and-electricity.php",
        "https://www.energy.gov/cmei/fuels/biopower-energy-heat-and-electricity",
        "https://www.energy.gov/hgeo/geothermal/geothermal-electricity-generation",
        "https://www.eia.gov/energyexplained/use-of-energy/efficiency-and-conservation.php",
      ],
      routeSlugs: {
        de: "energieumwandlung",
        en: "energy-transformation",
        id: "konversi-energi",
      },
      slug: "energy-transformation",
    },
    {
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/electricity/",
        "https://gatrik.esdm.go.id/berita/?slug=ditjen-gatrik-dan-pln-tetapkan-rasio-desa-berlistrik-dan-rasio-elektrifikasi-triwulan-iv-2024",
        "https://www.iea.org/reports/electricity-2026/executive-summary",
      ],
      routeSlugs: {
        de: "dringlichkeit-der-energiewende",
        en: "energy-urgency",
        id: "urgensi-isu-kebutuhan-energi",
      },
      slug: "energy-urgency",
    },
    {
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/what-is-energy/sources-of-energy.php",
        "https://www.eia.gov/energyexplained/nuclear/",
        "https://www.eia.gov/energyexplained/electricity/electricity-in-the-us-generation-capacity-and-sales.php",
        "https://www.eia.gov/energyexplained/energy-and-the-environment/where-greenhouse-gases-come-from.php",
      ],
      routeSlugs: {
        de: "nichterneuerbare-energiequellen",
        en: "non-renewable-sources",
        id: "sumber-energi-tak-terbarukan",
      },
      slug: "non-renewable-sources",
    },
    {
      evidenceUrls: [
        "https://www.eia.gov/energyexplained/renewable-sources/",
        "https://www.eia.gov/energyexplained/solar/photovoltaics-and-electricity.php",
        "https://www.energy.gov/cmei/systems/how-do-wind-turbines-work",
        "https://www.energy.gov/cmei/water/how-hydropower-works",
        "https://www.energy.gov/hgeo/geothermal/geothermal-basics",
        "https://www.epa.gov/anaerobic-digestion/basic-information-about-anaerobic-digestion",
        "https://www.energy.gov/cmei/water/marine-energy-basics",
        "https://www.esdm.go.id/en/media-center/news-archives/miliki-potensi-ebt-3686-gw-sekjen-rida-modal-utama-jalankan-transisi-energi-indonesia",
      ],
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
