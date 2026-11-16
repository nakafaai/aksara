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
        { correct: true, label: "$$-58.8\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-35.3\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-29.4\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$+58.8\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-58.8\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-35.3\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-29.4\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$+58.8\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
