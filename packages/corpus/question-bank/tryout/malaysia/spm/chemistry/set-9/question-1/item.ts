import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$24.60\\text{ cm}^3$$, $$0.197\\text{ mol dm}^{-3}$$, $$1.97\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$24.25\\text{ cm}^3$$, $$0.194\\text{ mol dm}^{-3}$$, $$1.94\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$24.25\\text{ cm}^3$$, $$0.0970\\text{ mol dm}^{-3}$$, $$0.970\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$24.37\\text{ cm}^3$$, $$0.195\\text{ mol dm}^{-3}$$, $$1.95\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$24.60\\text{ cm}^3$$, $$0.197\\text{ mol dm}^{-3}$$, $$1.97\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$24.25\\text{ cm}^3$$, $$0.194\\text{ mol dm}^{-3}$$, $$1.94\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$24.25\\text{ cm}^3$$, $$0.0970\\text{ mol dm}^{-3}$$, $$0.970\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$24.37\\text{ cm}^3$$, $$0.195\\text{ mol dm}^{-3}$$, $$1.95\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
