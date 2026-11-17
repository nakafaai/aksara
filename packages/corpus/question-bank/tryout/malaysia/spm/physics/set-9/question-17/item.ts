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
        {
          correct: false,
          label: "$$0.68\\text{ m}$$, and it can still focus on distant scenes",
        },
        { correct: false, label: "$$26\\text{ mm}$$, and $$27\\text{ mm}$$" },
        { correct: false, label: "$$0.68\\text{ m}$$, and $$0.23\\text{ m}$$" },
        { correct: true, label: "$$0.68\\text{ m}$$, and $$0.30\\text{ m}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.68\\text{ m}$$, dan ia masih boleh memfokus pemandangan jauh",
        },
        { correct: false, label: "$$26\\text{ mm}$$, dan $$27\\text{ mm}$$" },
        { correct: false, label: "$$0.68\\text{ m}$$, dan $$0.23\\text{ m}$$" },
        { correct: true, label: "$$0.68\\text{ m}$$, dan $$0.30\\text{ m}$$" },
      ],
    },
  },
};

export default item;
