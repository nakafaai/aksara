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
          label: "$$-1767\\text{ kJ mol}^{-1}$$, $$88.4\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$-1421\\text{ kJ mol}^{-1}$$, $$71.1\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$-2842\\text{ kJ mol}^{-1}$$, $$142\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$-1670\\text{ kJ mol}^{-1}$$, $$83.5\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-1767\\text{ kJ mol}^{-1}$$, $$88.4\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$-1421\\text{ kJ mol}^{-1}$$, $$71.1\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$-2842\\text{ kJ mol}^{-1}$$, $$142\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$-1670\\text{ kJ mol}^{-1}$$, $$83.5\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
