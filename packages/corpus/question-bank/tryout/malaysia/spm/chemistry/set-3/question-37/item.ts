import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "n = 1000, and the polymer is saturated" },
        { correct: false, label: "n = 1000, and the polymer decolourises bromine water" },
        { correct: false, label: "n = 1500, and its monomer is ethene" },
        { correct: false, label: "n = 1000, and it forms by condensation with water given off" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "n = 1000, dan polimer itu tepu" },
        { correct: false, label: "n = 1000, dan polimer itu menyahwarnakan air bromin" },
        { correct: false, label: "n = 1500, dan monomernya ialah etena" },
        { correct: false, label: "n = 1000, dan ia terbentuk melalui kondensasi dengan air dibebaskan" },
      ],
    },
  },
};

export default item;
