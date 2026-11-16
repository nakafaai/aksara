import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8.3\\text{ dm}^3$$, $$0^\\circ\\text{C}$$",
        },
        { correct: true, label: "$$8.3\\text{ dm}^3$$, $$4^\\circ\\text{C}$$" },
        {
          correct: false,
          label: "$$9.1\\text{ dm}^3$$, $$4^\\circ\\text{C}$$",
        },
        { correct: false, label: "$$0\\text{ dm}^3$$, $$4^\\circ\\text{C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8.3\\text{ dm}^3$$, $$0^\\circ\\text{C}$$",
        },
        { correct: true, label: "$$8.3\\text{ dm}^3$$, $$4^\\circ\\text{C}$$" },
        {
          correct: false,
          label: "$$9.1\\text{ dm}^3$$, $$4^\\circ\\text{C}$$",
        },
        { correct: false, label: "$$0\\text{ dm}^3$$, $$4^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
