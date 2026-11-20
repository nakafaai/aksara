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
            "$$3.59\\text{ g}$$, $$-52.4\\text{ kJ mol}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$0.270\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-1.31\\text{ kJ mol}^{-1}$$, $$0.540\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$0.540\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.59\\text{ g}$$, $$-52.4\\text{ kJ mol}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$0.270\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.87\\text{ g}$$, $$-1.31\\text{ kJ mol}^{-1}$$, $$0.540\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$2.87\\text{ g}$$, $$-65.5\\text{ kJ mol}^{-1}$$, $$0.540\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
