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
        { correct: false, label: "Phosphorus, $$40.0\\text{ cm}^3$$" },
        { correct: true, label: "Phosphorus, $$120\\text{ cm}^3$$" },
        { correct: false, label: "Phosphorus, $$30.0\\text{ cm}^3$$" },
        { correct: false, label: "Silicon, $$120\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Fosforus, $$40.0\\text{ cm}^3$$" },
        { correct: true, label: "Fosforus, $$120\\text{ cm}^3$$" },
        { correct: false, label: "Fosforus, $$30.0\\text{ cm}^3$$" },
        { correct: false, label: "Silikon, $$120\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
