import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac1{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: true,
          label: "$$\\frac7{30}$$",
        },
        {
          correct: false,
          label: "$$\\frac3{10}$$",
        },
      ],
    },
  },
};

export default item;
