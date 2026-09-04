import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonChemistryBasicChemistryLawsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/chemistry/basic-chemistry-laws",
  domain: "chemistry",
  key: "lesson.chemistry.basic-chemistry-laws",
  kind: "lesson",
  routeSlugs: {
    de: "grundgesetze-der-chemie",
    en: "basic-chemistry-laws",
    id: "hukum-dasar-kimia",
  },
  sections: [
    {
      evidenceUrls: [
        "https://inchemistry.acs.org/content/dam/acsorg/about/governance/committees/chemicalsafety/publications/safety-in-academic-chemistry-laboratories-students.pdf",
        "https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_%28Physical_and_Theoretical_Chemistry%29/Fundamentals/Chemical_Change_vs._Physical_Change",
        "https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions",
      ],
      routeSlugs: {
        de: "merkmale-chemischer-reaktionen",
        en: "chemical-reaction-characteristics",
        id: "ciri-ciri-reaksi-kimia",
      },
      slug: "chemical-reaction-characteristics",
    },
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations",
        "https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry",
        "https://openstax.org/books/chemistry-2e/pages/9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-1-early-ideas-in-atomic-theory",
      ],
      routeSlugs: {
        de: "anwendungen-chemischer-gesetze",
        en: "chemistry-law-applications",
        id: "aplikasi-hukum-kimia",
      },
      slug: "chemistry-law-applications",
    },
    {
      evidenceUrls: [
        "https://openstax.org/books/chemistry-2e/pages/9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions",
        "https://www.britannica.com/science/Gay-Lussacs-law-of-combining-volumes",
      ],
      routeSlugs: {
        de: "gesetz-der-gasvolumina",
        en: "combining-volumes-law",
        id: "hukum-perbandingan-volume",
      },
      slug: "combining-volumes-law",
    },
    {
      evidenceUrls: [
        "https://goldbook.iupac.org/terms/view/C01039/plain",
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/water/property/MolecularFormula/JSON",
        "https://www.ciaaw.org/abridged-atomic-weights.htm",
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/calcium%20oxide/property/MolecularFormula/JSON",
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ferric%20oxide/property/MolecularFormula/JSON",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-1-early-ideas-in-atomic-theory",
        "https://www.britannica.com/science/law-of-definite-proportions",
      ],
      routeSlugs: {
        de: "gesetz-der-konstanten-proportionen",
        en: "constant-composition-law",
        id: "hukum-perbandingan-tetap",
      },
      slug: "constant-composition-law",
    },
    {
      evidenceUrls: [
        "https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/",
        "https://www.ciaaw.org/abridged-atomic-weights.htm",
        "https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter",
        "https://www.britannica.com/science/chemical-reaction/The-conservation-of-matter",
      ],
      routeSlugs: {
        de: "gesetz-der-massenerhaltung",
        en: "mass-conservation-law",
        id: "hukum-kekekalan-massa",
      },
      slug: "mass-conservation-law",
    },
    {
      evidenceUrls: [
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/water/property/MolecularFormula/JSON",
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/hydrogen%20peroxide/property/MolecularFormula/JSON",
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/nitrous%20oxide/property/MolecularFormula/JSON",
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/nitrogen%20dioxide/property/MolecularFormula/JSON",
        "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-1-early-ideas-in-atomic-theory",
        "https://www.britannica.com/science/law-of-multiple-proportions",
      ],
      routeSlugs: {
        de: "gesetz-der-multiplen-proportionen",
        en: "multiple-proportions-law",
        id: "hukum-perbandingan-berganda",
      },
      slug: "multiple-proportions-law",
    },
    {
      evidenceUrls: [
        "https://pubchem.ncbi.nlm.nih.gov/compound/P4O10",
        "https://nvlpubs.nist.gov/nistpubs/TechnicalNotes/NIST.TN.2377.pdf",
        "https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions",
      ],
      routeSlugs: {
        de: "arten-chemischer-reaktionen",
        en: "types-chemical-reaction",
        id: "jenis-reaksi-kimia",
      },
      slug: "types-chemical-reaction",
    },
    {
      evidenceUrls: [
        "https://goldbook.iupac.org/terms/view/C01034",
        "https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations",
      ],
      routeSlugs: {
        de: "chemische-reaktionen-formulieren",
        en: "writing-chemical-reactions",
        id: "cara-menuliskan-reaksi-kimia",
      },
      slug: "writing-chemical-reactions",
    },
  ],
  slug: "basic-chemistry-laws",
  translations: {
    de: {
      description: "Erkenne chemische Veränderungen an Beobachtungen.",
      title: "Grundgesetze der Chemie",
    },
    en: {
      description: "Spot chemical changes from observable evidence.",
      title: "Basic Laws of Chemistry",
    },
    id: {
      description: "Kenali perubahan kimia dari bukti yang terlihat.",
      title: "Hukum Dasar Kimia",
    },
  },
});
