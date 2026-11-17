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
            "$$1.89\\text{ g}$$, $$0.0625\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.35\\text{ g}$$, $$0.125\\text{ mol dm}^{-3}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.89\\text{ g}$$, $$0.125\\text{ mol dm}^{-3}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.89\\text{ g}$$, $$0.125\\text{ mol dm}^{-3}$$, $$20.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.89\\text{ g}$$, $$0.0625\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.35\\text{ g}$$, $$0.125\\text{ mol dm}^{-3}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.89\\text{ g}$$, $$0.125\\text{ mol dm}^{-3}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.89\\text{ g}$$, $$0.125\\text{ mol dm}^{-3}$$, $$20.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
