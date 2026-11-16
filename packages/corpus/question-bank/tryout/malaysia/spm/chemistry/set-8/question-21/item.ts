import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.40\\text{ mol}$$, $$2.40\\text{ dm}^3$$" },
        {
          correct: false,
          label: "$$0.80\\text{ mol}$$, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ mol}$$, $$7.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.20\\text{ mol}$$, $$2.40\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.40\\text{ mol}$$, $$2.40\\text{ dm}^3$$" },
        {
          correct: false,
          label: "$$0.80\\text{ mol}$$, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ mol}$$, $$7.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.20\\text{ mol}$$, $$2.40\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
