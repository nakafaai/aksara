import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$15\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$12\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$9.6\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$30\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$15\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$12\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$9.6\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$30\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
