import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Silicon, $$40.0\\text{ cm}^3$$" },
        { correct: false, label: "Carbon, $$40.0\\text{ cm}^3$$" },
        { correct: false, label: "Silicon, $$10.0\\text{ cm}^3$$" },
        { correct: false, label: "Phosphorus, $$50.0\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Silikon, $$40.0\\text{ cm}^3$$" },
        { correct: false, label: "Karbon, $$40.0\\text{ cm}^3$$" },
        { correct: false, label: "Silikon, $$10.0\\text{ cm}^3$$" },
        { correct: false, label: "Fosforus, $$50.0\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
