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
          label: "$$-12.6\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$+1260\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$-27.4\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: true,
          label: "$$-1260\\text{ kJ mol}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-12.6\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$+1260\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label: "$$-27.4\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: true,
          label: "$$-1260\\text{ kJ mol}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
