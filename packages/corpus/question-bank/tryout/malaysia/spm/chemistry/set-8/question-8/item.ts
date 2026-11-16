import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.78\\times10^{-3}$$" },
        { correct: false, label: "$$5.02\\times10^{21}$$" },
        { correct: true, label: "$$1.67\\times10^{21}$$" },
        { correct: false, label: "$$3.01\\times10^{22}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.78\\times10^{-3}$$" },
        { correct: false, label: "$$5.02\\times10^{21}$$" },
        { correct: true, label: "$$1.67\\times10^{21}$$" },
        { correct: false, label: "$$3.01\\times10^{22}$$" },
      ],
    },
  },
};

export default item;
