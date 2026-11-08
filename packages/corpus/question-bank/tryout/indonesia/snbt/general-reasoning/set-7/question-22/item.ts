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
          label: "$$121$$",
        },
        {
          correct: true,
          label: "$$144$$",
        },
        {
          correct: false,
          label: "$$156$$",
        },
        {
          correct: false,
          label: "$$169$$",
        },
        {
          correct: false,
          label: "$$196$$",
        },
      ],
    },
  },
};

export default item;
