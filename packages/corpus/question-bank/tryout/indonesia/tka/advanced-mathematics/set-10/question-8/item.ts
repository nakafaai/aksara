import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$33$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$17$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;
