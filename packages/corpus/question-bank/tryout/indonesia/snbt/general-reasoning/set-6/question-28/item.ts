import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac1{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{14}$$",
        },
        {
          correct: true,
          label: "$$\\frac{11}{168}$$",
        },
        {
          correct: false,
          label: "$$\\frac{13}{168}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{12}$$",
        },
      ],
    },
  },
};

export default item;
