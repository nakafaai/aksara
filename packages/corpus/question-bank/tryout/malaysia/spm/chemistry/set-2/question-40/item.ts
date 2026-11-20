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
            "$$2.40\\text{ dm}^3$$, $$9.80\\text{ g}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$22.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.16\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$45.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$45.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$9.80\\text{ g}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$22.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.16\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$45.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$45.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
