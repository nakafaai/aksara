import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.0$$",
        },
        {
          correct: false,
          label: "$$1.7$$",
        },
        {
          correct: false,
          label: "$$1.0$$",
        },
        {
          correct: false,
          label: "$$7.0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.0$$",
        },
        {
          correct: false,
          label: "$$1.7$$",
        },
        {
          correct: false,
          label: "$$1.0$$",
        },
        {
          correct: false,
          label: "$$7.0$$",
        },
      ],
    },
  },
};

export default item;
