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
            "$$2.20\\text{ g}$$, $$7.80\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$8.80\\text{ g}$$, $$15.6\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$8.80\\text{ g}$$, $$7.80\\text{ dm}^3$$, $$9.00\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$8.80\\text{ g}$$, $$7.80\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.20\\text{ g}$$, $$7.80\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$8.80\\text{ g}$$, $$15.6\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$8.80\\text{ g}$$, $$7.80\\text{ dm}^3$$, $$9.00\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$8.80\\text{ g}$$, $$7.80\\text{ dm}^3$$, $$4.50\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
