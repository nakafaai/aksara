import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Calcium only" },
        { correct: false, label: "Iron or calcium" },
        { correct: false, label: "Iron only" },
        { correct: true, label: "Magnesium or nitrogen" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kalsium sahaja" },
        { correct: false, label: "Ferum atau kalsium" },
        { correct: false, label: "Ferum sahaja" },
        { correct: true, label: "Magnesium atau nitrogen" },
      ],
    },
  },
};

export default item;
