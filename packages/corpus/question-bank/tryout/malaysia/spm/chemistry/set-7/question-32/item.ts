import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Propan-1-ol, propanoic acid" },
        { correct: false, label: "Ethanol, ethanoic acid" },
        { correct: true, label: "Butan-1-ol, butanoic acid" },
        { correct: false, label: "Pentan-1-ol, pentanoic acid" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Propan-1-ol, asid propanoik" },
        { correct: false, label: "Etanol, asid etanoik" },
        { correct: true, label: "Butan-1-ol, asid butanoik" },
        { correct: false, label: "Pentan-1-ol, asid pentanoik" },
      ],
    },
  },
};

export default item;
