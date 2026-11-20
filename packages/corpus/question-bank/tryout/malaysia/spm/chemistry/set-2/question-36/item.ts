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
            "$$3.59\\text{ g}$$, $$-52.4\\text{ kJ mol}^{-1}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$250\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-1.31\\text{ kJ mol}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.59\\text{ g}$$, $$-52.4\\text{ kJ mol}^{-1}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$250\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-1.31\\text{ kJ mol}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
