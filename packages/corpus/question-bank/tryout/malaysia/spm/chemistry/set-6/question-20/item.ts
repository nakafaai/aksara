import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$9.17\\times10^{21}$$, $$0.67\\text{ g}$$" },
        { correct: true, label: "$$9.17\\times10^{21}$$, $$8.00\\text{ g}$$" },
        { correct: false, label: "$$2.20\\times10^{20}$$, $$8.00\\text{ g}$$" },
        { correct: false, label: "$$1.22\\times10^{22}$$, $$8.00\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$9.17\\times10^{21}$$, $$0.67\\text{ g}$$" },
        { correct: true, label: "$$9.17\\times10^{21}$$, $$8.00\\text{ g}$$" },
        { correct: false, label: "$$2.20\\times10^{20}$$, $$8.00\\text{ g}$$" },
        { correct: false, label: "$$1.22\\times10^{22}$$, $$8.00\\text{ g}$$" },
      ],
    },
  },
};

export default item;
