import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$140\\text{ kJ}$$, $$7.20\\text{ dm}^3$$" },
        { correct: false, label: "$$140\\text{ kJ}$$, $$1.20\\text{ dm}^3$$" },
        {
          correct: false,
          label: "$$25\\,200\\text{ kJ}$$, $$7.20\\text{ dm}^3$$",
        },
        { correct: false, label: "$$280\\text{ kJ}$$, $$14.4\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$140\\text{ kJ}$$, $$7.20\\text{ dm}^3$$" },
        { correct: false, label: "$$140\\text{ kJ}$$, $$1.20\\text{ dm}^3$$" },
        {
          correct: false,
          label: "$$25\\,200\\text{ kJ}$$, $$7.20\\text{ dm}^3$$",
        },
        { correct: false, label: "$$280\\text{ kJ}$$, $$14.4\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
