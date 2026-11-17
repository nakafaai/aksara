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
          label: "$$-184\\text{ kJ mol}^{-1}$$, $$6.00\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$+92\\text{ kJ mol}^{-1}$$, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$-92\\text{ kJ mol}^{-1}$$, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$-92\\text{ kJ mol}^{-1}$$, $$6.00\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-184\\text{ kJ mol}^{-1}$$, $$6.00\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$+92\\text{ kJ mol}^{-1}$$, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$-92\\text{ kJ mol}^{-1}$$, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$-92\\text{ kJ mol}^{-1}$$, $$6.00\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
