import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$16.0\\text{ g}$$, $$8.82\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.16\\text{ dm}^3$$, $$16.0\\text{ g}$$, $$17.6\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$17.8\\text{ g}$$, $$19.6\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$2.40\\text{ dm}^3$$, $$16.0\\text{ g}$$, $$17.6\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$16.0\\text{ g}$$, $$8.82\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.16\\text{ dm}^3$$, $$16.0\\text{ g}$$, $$17.6\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$17.8\\text{ g}$$, $$19.6\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$2.40\\text{ dm}^3$$, $$16.0\\text{ g}$$, $$17.6\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
