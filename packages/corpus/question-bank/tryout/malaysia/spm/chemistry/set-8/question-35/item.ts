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
        { correct: false, label: "$$-1306\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-808\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$+118\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-4\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-1306\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-808\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$+118\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-4\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
