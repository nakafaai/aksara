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
        { correct: false, label: "$$-1370\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-504\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-1008\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-10.1\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$-1370\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-504\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$-1008\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$-10.1\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
