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
        { correct: false, label: "Methyl propanoate, 8.16 g" },
        { correct: false, label: "Ethyl propanoate, 10.2 g" },
        { correct: false, label: "Propyl ethanoate, 8.16 g" },
        { correct: true, label: "Ethyl propanoate, 8.16 g" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Metil propanoat, 8.16 g" },
        { correct: false, label: "Etil propanoat, 10.2 g" },
        { correct: false, label: "Propil etanoat, 8.16 g" },
        { correct: true, label: "Etil propanoat, 8.16 g" },
      ],
    },
  },
};

export default item;
