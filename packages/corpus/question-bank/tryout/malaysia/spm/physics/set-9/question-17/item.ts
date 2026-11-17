import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.68\\text{ m}$$, and $$12.5$$" },
        { correct: false, label: "$$26\\text{ mm}$$, and $$2.1$$" },
        { correct: false, label: "$$0.68\\text{ m}$$, and $$0.074$$" },
        { correct: true, label: "$$0.68\\text{ m}$$, and $$0.080$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.68\\text{ m}$$, dan $$12.5$$" },
        { correct: false, label: "$$26\\text{ mm}$$, dan $$2.1$$" },
        { correct: false, label: "$$0.68\\text{ m}$$, dan $$0.074$$" },
        { correct: true, label: "$$0.68\\text{ m}$$, dan $$0.080$$" },
      ],
    },
  },
};

export default item;
