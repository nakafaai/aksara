import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$12.1^\\circ\\text{C}$$" },
        { correct: false, label: "$$6.8^\\circ\\text{C}$$" },
        { correct: false, label: "$$5.3^\\circ\\text{C}$$" },
        { correct: false, label: "$$18.9^\\circ\\text{C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$12.1^\\circ\\text{C}$$" },
        { correct: false, label: "$$6.8^\\circ\\text{C}$$" },
        { correct: false, label: "$$5.3^\\circ\\text{C}$$" },
        { correct: false, label: "$$18.9^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
