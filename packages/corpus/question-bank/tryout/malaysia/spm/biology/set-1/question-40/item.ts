import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6400$$",
        },
        {
          correct: false,
          label: "$$500$$",
        },
        {
          correct: true,
          label: "$$1600$$",
        },
        {
          correct: false,
          label: "$$3200$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6400$$",
        },
        {
          correct: false,
          label: "$$500$$",
        },
        {
          correct: true,
          label: "$$1600$$",
        },
        {
          correct: false,
          label: "$$3200$$",
        },
      ],
    },
  },
};

export default item;
