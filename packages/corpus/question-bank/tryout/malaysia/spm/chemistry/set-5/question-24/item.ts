import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.13\\text{ g}$$, $$\\tfrac{1}{6}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.13\\text{ g}$$, $$\\tfrac{5}{6}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$6.39\\text{ g}$$, $$\\tfrac{1}{6}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.13\\text{ g}$$, $$\\tfrac{1}{6}$$, $$1.40\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.13\\text{ g}$$, $$\\tfrac{1}{6}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.13\\text{ g}$$, $$\\tfrac{5}{6}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$6.39\\text{ g}$$, $$\\tfrac{1}{6}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.13\\text{ g}$$, $$\\tfrac{1}{6}$$, $$1.40\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
