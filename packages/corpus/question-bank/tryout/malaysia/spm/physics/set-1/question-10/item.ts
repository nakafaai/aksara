import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$24^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$0^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "$$8^\\circ\\text{C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$24^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$0^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "$$8^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
