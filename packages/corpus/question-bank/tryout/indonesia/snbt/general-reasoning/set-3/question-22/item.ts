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
          correct: false,
          label: "$$110$$",
        },
        {
          correct: false,
          label: "$$200$$",
        },
        {
          correct: true,
          label: "$$220$$",
        },
        {
          correct: false,
          label: "$$242$$",
        },
        {
          correct: false,
          label: "$$400$$",
        },
      ],
    },
  },
};

export default item;
