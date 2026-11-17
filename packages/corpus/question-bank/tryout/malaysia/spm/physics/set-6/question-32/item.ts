import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32\\text{ A}$$, and $$0.013\\text{ mm}$$" },
        { correct: false, label: "$$0.16\\text{ A}$$, and $$1.3\\text{ mm}$$" },
        {
          correct: false,
          label: "$$0.32\\text{ A}$$, and $$0.63\\text{ mm}$$",
        },
        { correct: true, label: "$$0.32\\text{ A}$$, and $$1.3\\text{ mm}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32\\text{ A}$$, dan $$0.013\\text{ mm}$$" },
        { correct: false, label: "$$0.16\\text{ A}$$, dan $$1.3\\text{ mm}$$" },
        {
          correct: false,
          label: "$$0.32\\text{ A}$$, dan $$0.63\\text{ mm}$$",
        },
        { correct: true, label: "$$0.32\\text{ A}$$, dan $$1.3\\text{ mm}$$" },
      ],
    },
  },
};

export default item;
