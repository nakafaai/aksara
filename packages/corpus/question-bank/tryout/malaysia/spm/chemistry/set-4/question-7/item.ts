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
        { correct: false, label: "$$1.20 \\times 10^{23}$$" },
        { correct: false, label: "$$1.81 \\times 10^{23}$$" },
        { correct: true, label: "$$3.01 \\times 10^{23}$$" },
        { correct: false, label: "$$2.76 \\times 10^{23}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.20 \\times 10^{23}$$" },
        { correct: false, label: "$$1.81 \\times 10^{23}$$" },
        { correct: true, label: "$$3.01 \\times 10^{23}$$" },
        { correct: false, label: "$$2.76 \\times 10^{23}$$" },
      ],
    },
  },
};

export default item;
