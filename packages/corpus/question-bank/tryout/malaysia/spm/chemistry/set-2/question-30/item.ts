import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$2.80\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.30\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$11.4\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.30\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$11.4\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$4.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$14.2\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.30\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.80\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.30\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$11.4\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.30\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$11.4\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$4.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$14.2\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.30\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
