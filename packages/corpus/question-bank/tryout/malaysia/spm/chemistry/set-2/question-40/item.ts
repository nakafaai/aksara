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
            "$$2.40\\text{ dm}^3$$, $$9.80\\text{ g}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$0.0900\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.16\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$0.180\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$0.180\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$9.80\\text{ g}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$0.0900\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.16\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$0.180\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$2.40\\text{ dm}^3$$, $$8.82\\text{ g}$$, $$0.180\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
