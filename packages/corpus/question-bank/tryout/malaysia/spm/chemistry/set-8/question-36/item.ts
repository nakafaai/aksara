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
        {
          correct: true,
          label: "$$10.2^\\circ\\text{C}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$20.4^\\circ\\text{C}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$13.6^\\circ\\text{C}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.2^\\circ\\text{C}$$, $$2.40\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$10.2^\\circ\\text{C}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$20.4^\\circ\\text{C}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$13.6^\\circ\\text{C}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.2^\\circ\\text{C}$$, $$2.40\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
