import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$25.00$$, $$6.44\\times10^{21}$$" },
        { correct: false, label: "$$24.32$$, $$2.01\\times10^{22}$$" },
        { correct: false, label: "$$24.32$$, $$6.02\\times10^{22}$$" },
        { correct: true, label: "$$24.32$$, $$6.62\\times10^{21}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$25.00$$, $$6.44\\times10^{21}$$" },
        { correct: false, label: "$$24.32$$, $$2.01\\times10^{22}$$" },
        { correct: false, label: "$$24.32$$, $$6.02\\times10^{22}$$" },
        { correct: true, label: "$$24.32$$, $$6.62\\times10^{21}$$" },
      ],
    },
  },
};

export default item;
