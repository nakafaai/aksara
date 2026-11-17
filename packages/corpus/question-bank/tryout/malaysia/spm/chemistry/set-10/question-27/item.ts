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
            "$$2.55\\text{ g}$$, $$8.10\\text{ g}$$, $$13.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.90\\text{ g}$$, $$9.00\\text{ g}$$, $$13.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.90\\text{ g}$$, $$8.10\\text{ g}$$, $$21.6\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$2.90\\text{ g}$$, $$8.10\\text{ g}$$, $$13.8\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.55\\text{ g}$$, $$8.10\\text{ g}$$, $$13.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.90\\text{ g}$$, $$9.00\\text{ g}$$, $$13.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.90\\text{ g}$$, $$8.10\\text{ g}$$, $$21.6\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$2.90\\text{ g}$$, $$8.10\\text{ g}$$, $$13.8\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
