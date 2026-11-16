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
        { correct: false, label: "$$45.5^\\circ\\text{C}$$" },
        { correct: false, label: "$$48.8^\\circ\\text{C}$$" },
        { correct: false, label: "$$65.0^\\circ\\text{C}$$" },
        { correct: true, label: "$$34.1^\\circ\\text{C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$45.5^\\circ\\text{C}$$" },
        { correct: false, label: "$$48.8^\\circ\\text{C}$$" },
        { correct: false, label: "$$65.0^\\circ\\text{C}$$" },
        { correct: true, label: "$$34.1^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
