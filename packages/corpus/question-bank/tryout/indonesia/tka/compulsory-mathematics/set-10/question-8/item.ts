import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{25}{51}$$",
        },
        {
          correct: false,
          label: "$$\\frac{23}{47}$$",
        },
        {
          correct: false,
          label: "$$\\frac{46}{255}$$",
        },
        {
          correct: true,
          label: "$$\\frac{23}{255}$$",
        },
        {
          correct: false,
          label: "$$\\frac{22}{357}$$",
        },
      ],
    },
  },
};

export default item;
