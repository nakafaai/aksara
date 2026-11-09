import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac53$$",
        },
        {
          correct: false,
          label: "$$7{,}2$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: true,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$60$$",
        },
      ],
    },
  },
};

export default item;
