import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$4.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.00\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.20\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$2.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$1.20\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$4.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$, $$2.40\\text{ dm}^3$$, $$2.00\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.20\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$2.00\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$1.20\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
