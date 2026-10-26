import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac1{210}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{180}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{144}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{120}$$",
        },
        {
          correct: true,
          label: "$$\\frac1{168}$$",
        },
      ],
    },
  },
};

export default item;
