import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "optimization",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: false,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$17$$",
        },
        {
          correct: true,
          label: "$$18$$",
        },
        {
          correct: false,
          label: "$$19$$",
        },
      ],
    },
  },
};

export default item;
