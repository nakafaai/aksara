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
        {
          correct: false,
          label: "$$-27.3\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$+54.6\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: true,
          label: "$$-54.6\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$-109.2\\text{ kJ mol}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-27.3\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$+54.6\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: true,
          label: "$$-54.6\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$-109.2\\text{ kJ mol}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
