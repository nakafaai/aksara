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
          correct: false,
          label: "$$8.19^\\circ\\text{C}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$5.46^\\circ\\text{C}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$5.46^\\circ\\text{C}$$, $$0.60\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$9.10^\\circ\\text{C}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8.19^\\circ\\text{C}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$5.46^\\circ\\text{C}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$5.46^\\circ\\text{C}$$, $$0.60\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$9.10^\\circ\\text{C}$$, $$0.20\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
