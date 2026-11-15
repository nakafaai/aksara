import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
      ],
    },
  },
};

export default item;
