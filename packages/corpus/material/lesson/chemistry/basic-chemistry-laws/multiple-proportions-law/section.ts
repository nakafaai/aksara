import type { LessonSection } from "#corpus/material/schema";

const section: LessonSection = {
  evidenceUrls: [
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/water/property/MolecularFormula/JSON",
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/hydrogen%20peroxide/property/MolecularFormula/JSON",
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/nitrous%20oxide/property/MolecularFormula/JSON",
    "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/nitrogen%20dioxide/property/MolecularFormula/JSON",
    "https://openstax.org/books/chemistry-atoms-first-2e/pages/2-1-early-ideas-in-atomic-theory",
    "https://www.britannica.com/science/law-of-multiple-proportions",
  ],
  routeSlugs: {
    en: "multiple-proportions-law",
    id: "hukum-perbandingan-berganda",
    de: "gesetz-der-multiplen-proportionen",
    ms: "hukum-perkadaran-berganda",
  },
};

export default section;
