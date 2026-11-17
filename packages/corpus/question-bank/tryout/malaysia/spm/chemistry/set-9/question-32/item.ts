import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$2.80\\text{ g}$$, $$48.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.800\\text{ mol dm}^{-3}$$, $$1.00\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.800\\text{ mol dm}^{-3}$$, $$0\\text{ g}$$, $$720\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.800\\text{ mol dm}^{-3}$$, $$2.00\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.0800\\text{ mol dm}^{-3}$$, $$2.80\\text{ g}$$, $$48.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.800\\text{ mol dm}^{-3}$$, $$1.00\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.800\\text{ mol dm}^{-3}$$, $$0\\text{ g}$$, $$720\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.800\\text{ mol dm}^{-3}$$, $$2.00\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
