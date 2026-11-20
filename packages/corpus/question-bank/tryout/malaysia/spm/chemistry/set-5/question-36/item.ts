import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$846\\text{ kJ}$$, $$74.6\\text{ kJ}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$996\\text{ kJ}$$, $$37.3\\text{ kJ}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$846\\text{ kJ}$$, $$37.3\\text{ kJ}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$846\\text{ kJ}$$, $$37.3\\text{ kJ}$$, $$2.40\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$846\\text{ kJ}$$, $$74.6\\text{ kJ}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$996\\text{ kJ}$$, $$37.3\\text{ kJ}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$846\\text{ kJ}$$, $$37.3\\text{ kJ}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$846\\text{ kJ}$$, $$37.3\\text{ kJ}$$, $$2.40\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
