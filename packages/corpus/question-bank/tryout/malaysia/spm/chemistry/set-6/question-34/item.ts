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
        { correct: false, label: "$$-61.3\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-57.1\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-52.9\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-28.6\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-61.3\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-57.1\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-52.9\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-28.6\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
