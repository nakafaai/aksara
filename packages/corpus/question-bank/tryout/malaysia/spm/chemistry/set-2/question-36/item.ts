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
        { correct: false, label: "$$20^\\circ\\text{C}$$" },
        { correct: false, label: "$$40^\\circ\\text{C}$$" },
        { correct: false, label: "$$10^\\circ\\text{C}$$" },
        { correct: true, label: "$$5^\\circ\\text{C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20^\\circ\\text{C}$$" },
        { correct: false, label: "$$40^\\circ\\text{C}$$" },
        { correct: false, label: "$$10^\\circ\\text{C}$$" },
        { correct: true, label: "$$5^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
