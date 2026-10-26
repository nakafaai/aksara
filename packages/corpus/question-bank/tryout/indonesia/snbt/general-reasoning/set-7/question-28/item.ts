import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac1{21}$$",
        },
        {
          correct: true,
          label: "$$\\frac1{14}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{12}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{10}$$",
        },
      ],
    },
  },
};

export default item;
