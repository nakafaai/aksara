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
        { correct: true, label: "$$-58.8\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-57.1\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$+58.8\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-117.6\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-58.8\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-57.1\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$+58.8\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-117.6\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
