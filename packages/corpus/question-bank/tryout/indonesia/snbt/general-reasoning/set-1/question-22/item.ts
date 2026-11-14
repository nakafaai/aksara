import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "weighted-average",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$21$$ potong",
        },
        {
          correct: false,
          label: "$$23$$ potong",
        },
        {
          correct: false,
          label: "$$26$$ potong",
        },
        {
          correct: true,
          label: "$$28$$ potong",
        },
        {
          correct: false,
          label: "$$29$$ potong",
        },
      ],
    },
  },
};

export default item;
