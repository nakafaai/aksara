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
        {
          correct: true,
          label: "$$3.9^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$7.8^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$1.9^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$15.6^\\circ\\text{C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.9^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$7.8^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$1.9^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$15.6^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
