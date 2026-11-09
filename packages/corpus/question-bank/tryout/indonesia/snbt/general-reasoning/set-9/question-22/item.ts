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
          label: "$$96$$",
        },
        {
          correct: true,
          label: "$$108$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: false,
          label: "$$132$$",
        },
        {
          correct: false,
          label: "$$144$$",
        },
      ],
    },
  },
};

export default item;
