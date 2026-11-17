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
            "$$4.80\\text{ dm}^3$$, $$5.60\\text{ g}$$, $$8.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.92\\text{ dm}^3$$, $$2.24\\text{ g}$$, $$6.88\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$3.84\\text{ dm}^3$$, $$4.48\\text{ g}$$, $$6.88\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3.84\\text{ dm}^3$$, $$4.48\\text{ g}$$, $$8.60\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.80\\text{ dm}^3$$, $$5.60\\text{ g}$$, $$8.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.92\\text{ dm}^3$$, $$2.24\\text{ g}$$, $$6.88\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$3.84\\text{ dm}^3$$, $$4.48\\text{ g}$$, $$6.88\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3.84\\text{ dm}^3$$, $$4.48\\text{ g}$$, $$8.60\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
