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
            "$$9.20\\text{ kJ}$$, $$0.600\\text{ dm}^3$$, $$25.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$23.0\\text{ kJ}$$, $$0\\text{ dm}^3$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$18.4\\text{ kJ}$$, $$0.600\\text{ dm}^3$$, $$1000\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$18.4\\text{ kJ}$$, $$0.600\\text{ dm}^3$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.20\\text{ kJ}$$, $$0.600\\text{ dm}^3$$, $$25.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$23.0\\text{ kJ}$$, $$0\\text{ dm}^3$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$18.4\\text{ kJ}$$, $$0.600\\text{ dm}^3$$, $$1000\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$18.4\\text{ kJ}$$, $$0.600\\text{ dm}^3$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
