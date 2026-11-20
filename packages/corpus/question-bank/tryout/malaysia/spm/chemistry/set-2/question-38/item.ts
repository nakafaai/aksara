import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.25\\text{ g}$$, $$4.80\\text{ dm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$6.25\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$5.40\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.80\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$5.40\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.25\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$6.30\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.25\\text{ g}$$, $$4.80\\text{ dm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$6.25\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$5.40\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.80\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$5.40\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.25\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$6.30\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
