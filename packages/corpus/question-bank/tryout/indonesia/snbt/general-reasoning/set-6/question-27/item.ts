import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "ratio",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$36$$",
        },
        {
          correct: false,
          label: "$$38$$",
        },
        {
          correct: true,
          label: "$$39$$",
        },
        {
          correct: false,
          label: "$$40$$",
        },
        {
          correct: false,
          label: "$$45$$",
        },
      ],
    },
  },
};

export default item;
