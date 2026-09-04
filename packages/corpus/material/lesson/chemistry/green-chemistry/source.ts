import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryGreenChemistryMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/green-chemistry",
  domain: "chemistry",
  key: "lesson.chemistry.green-chemistry",
  kind: "lesson",
  routeSlugs: { de: "gruene-chemie", en: "green-chemistry", id: "kimia-hijau" },
  sections: [
    {
      evidenceUrls: [
        "https://www.epa.gov/greenchemistry/basics-green-chemistry",
        "https://goldbook.iupac.org/terms/view/A00493",
        "https://goldbook.iupac.org/terms/view/C01022",
        "https://goldbook.iupac.org/terms/view/M04002",
        "https://www.cdc.gov/hygiene/about/cleaning-and-disinfecting-with-bleach.html",
        "https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations",
        "https://openstax.org/books/concepts-biology/pages/5-1-overview-of-photosynthesis",
      ],
      routeSlugs: {
        de: "chemische-prozesse-im-alltag",
        en: "chemical-processes-daily-life",
        id: "proses-kimia-sehari-hari",
      },
      slug: "chemical-processes-daily-life",
    },
    {
      evidenceUrls: [
        "https://www.epa.gov/greenchemistry/basics-green-chemistry",
        "https://chem.washington.edu/lecture-demos/electrolysis-water",
        "https://www.energy.gov/cmei/fuels/hydrogen-production-electrolysis",
        "https://www.mdpi.com/1996-1944/12/23/3902",
        "https://www.acs.org/green-chemistry-sustainability/principles/12-principles-of-green-chemistry.html",
      ],
      routeSlugs: {
        de: "definition",
        en: "definition",
        id: "pengertian-kimia-hijau",
      },
      slug: "definition",
    },
    {
      evidenceUrls: [
        "https://sdgs.un.org/goals",
        "https://www.acs.org/green-chemistry-sustainability/education/chemistry-sustainable-development-goals.html",
        "https://www.epa.gov/sustainable-management-food/approaches-composting",
        "https://www.epa.gov/trash-free-waters/frequently-asked-questions-about-plastic-recycling-and-composting",
        "https://www.epa.gov/greenchemistry/basics-green-chemistry",
      ],
      routeSlugs: {
        de: "massnahmen-der-gruenen-chemie",
        en: "green-chemistry-activities",
        id: "kegiatan-kimia-hijau",
      },
      slug: "green-chemistry-activities",
    },
    {
      evidenceUrls: [
        "https://www.epa.gov/greenchemistry/basics-green-chemistry",
        "https://www.acs.org/green-chemistry-sustainability/principles/12-principles-of-green-chemistry.html",
        "https://pubchem.ncbi.nlm.nih.gov/compound/Capsaicin",
        "https://pubchem.ncbi.nlm.nih.gov/compound/Ethanol",
        "https://goldbook.iupac.org/terms/view/C00876",
      ],
      routeSlugs: {
        de: "prinzipien",
        en: "principles",
        id: "prinsip-kimia-hijau",
      },
      slug: "principles",
    },
  ],
  slug: "green-chemistry",
  translations: {
    de: {
      description: "Bewerte Alltagsreaktionen mit grüner Chemie.",
      title: "Grüne Chemie",
    },
    en: {
      description: "Judge everyday reactions through green chemistry ideas.",
      title: "Green Chemistry",
    },
    id: {
      description: "Nilai reaksi sehari-hari dengan prinsip kimia hijau.",
      title: "Kimia Hijau",
    },
  },
});
