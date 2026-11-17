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
          correct: false,
          label:
            "$$3.59\\text{ g}$$, $$3.90^\\circ\\text{C}$$, $$0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$6.24^\\circ\\text{C}$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$3.12^\\circ\\text{C}$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$2.87\\text{ g}$$, $$3.12^\\circ\\text{C}$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.59\\text{ g}$$, $$3.90^\\circ\\text{C}$$, $$0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$6.24^\\circ\\text{C}$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$3.12^\\circ\\text{C}$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$2.87\\text{ g}$$, $$3.12^\\circ\\text{C}$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
