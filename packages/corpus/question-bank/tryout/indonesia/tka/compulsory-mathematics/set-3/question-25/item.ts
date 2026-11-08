import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{4}{27}$$",
        },
        {
          correct: true,
          label: "$$\\frac16$$",
        },
        {
          correct: false,
          label: "$$\\frac{16}{81}$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
        {
          correct: false,
          label: "$$\\frac49$$",
        },
      ],
    },
  },
};

export default item;
