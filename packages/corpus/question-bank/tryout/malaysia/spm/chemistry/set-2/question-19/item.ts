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
            "$$0.840\\text{ dm}^3$$, $$1.08\\text{ dm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.840\\text{ dm}^3$$, $$1.08\\text{ dm}^3$$, $$3.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.840\\text{ dm}^3$$, $$3.12\\text{ dm}^3$$, $$10.4\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.360\\text{ dm}^3$$, $$1.08\\text{ dm}^3$$, $$3.60\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.840\\text{ dm}^3$$, $$1.08\\text{ dm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.840\\text{ dm}^3$$, $$1.08\\text{ dm}^3$$, $$3.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.840\\text{ dm}^3$$, $$3.12\\text{ dm}^3$$, $$10.4\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.360\\text{ dm}^3$$, $$1.08\\text{ dm}^3$$, $$3.60\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
