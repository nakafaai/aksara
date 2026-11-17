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
        { correct: false, label: "$$-47.9\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-115\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-57.5\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-33.5\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-47.9\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-115\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-57.5\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-33.5\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
