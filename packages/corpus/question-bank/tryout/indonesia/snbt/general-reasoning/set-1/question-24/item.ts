import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$\\frac{26}{3}$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: true,
          label: "$$\\frac{28}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{32}{3}$$",
        },
      ],
    },
  },
};

export default item;
