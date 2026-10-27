import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac1{30}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{24}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{15}$$",
        },
        {
          correct: true,
          label: "$$\\frac1{20}$$",
        },
      ],
    },
  },
};

export default item;
