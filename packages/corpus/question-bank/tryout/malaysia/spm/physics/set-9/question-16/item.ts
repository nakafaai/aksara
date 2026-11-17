import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$545\\text{ nm}$$, and $$0.82\\text{ mm}$$",
        },
        { correct: false, label: "$$600\\text{ nm}$$, and $$1.6\\text{ mm}$$" },
        { correct: true, label: "$$600\\text{ nm}$$, and $$0.90\\text{ mm}$$" },
        { correct: false, label: "$$600\\text{ nm}$$, and $$1.2\\text{ mm}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$545\\text{ nm}$$, dan $$0.82\\text{ mm}$$",
        },
        { correct: false, label: "$$600\\text{ nm}$$, dan $$1.6\\text{ mm}$$" },
        { correct: true, label: "$$600\\text{ nm}$$, dan $$0.90\\text{ mm}$$" },
        { correct: false, label: "$$600\\text{ nm}$$, dan $$1.2\\text{ mm}$$" },
      ],
    },
  },
};

export default item;
