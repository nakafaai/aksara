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
            "$$2.40\\text{ dm}^3$$, $$4.60\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.960\\text{ dm}^3$$, $$1.84\\text{ g}$$, $$0.480\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.92\\text{ dm}^3$$, $$3.68\\text{ g}$$, $$0.960\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.92\\text{ dm}^3$$, $$3.68\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$4.60\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.960\\text{ dm}^3$$, $$1.84\\text{ g}$$, $$0.480\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.92\\text{ dm}^3$$, $$3.68\\text{ g}$$, $$0.960\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.92\\text{ dm}^3$$, $$3.68\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
