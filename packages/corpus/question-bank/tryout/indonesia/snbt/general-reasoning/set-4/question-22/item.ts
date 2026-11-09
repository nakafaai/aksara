import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "figure-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$56$$",
        },
        {
          correct: false,
          label: "$$60$$",
        },
        {
          correct: false,
          label: "$$64$$",
        },
        {
          correct: false,
          label: "$$169$$",
        },
        {
          correct: false,
          label: "$$225$$",
        },
      ],
    },
  },
};

export default item;
