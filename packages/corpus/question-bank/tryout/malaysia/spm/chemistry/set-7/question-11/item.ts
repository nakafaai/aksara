import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.22\\times10^{19}$$" },
        { correct: false, label: "$$4.45\\times10^{22}$$" },
        { correct: true, label: "$$4.45\\times10^{19}$$" },
        { correct: false, label: "$$2.22\\times10^{22}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.22\\times10^{19}$$" },
        { correct: false, label: "$$4.45\\times10^{22}$$" },
        { correct: true, label: "$$4.45\\times10^{19}$$" },
        { correct: false, label: "$$2.22\\times10^{22}$$" },
      ],
    },
  },
};

export default item;
