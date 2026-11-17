import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$0\\text{ g}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$300\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$300\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$1.00\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$0\\text{ g}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$300\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$300\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$1.00\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
