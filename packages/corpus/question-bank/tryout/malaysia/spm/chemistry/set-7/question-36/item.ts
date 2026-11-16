import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$8.19^\\circ\\text{C}$$" },
        { correct: true, label: "$$5.46^\\circ\\text{C}$$" },
        { correct: false, label: "$$13.6^\\circ\\text{C}$$" },
        { correct: false, label: "$$9.10^\\circ\\text{C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$8.19^\\circ\\text{C}$$" },
        { correct: true, label: "$$5.46^\\circ\\text{C}$$" },
        { correct: false, label: "$$13.6^\\circ\\text{C}$$" },
        { correct: false, label: "$$9.10^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
