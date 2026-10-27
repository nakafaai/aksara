import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{5!}{2}$$",
        },
        {
          correct: true,
          label: "$$2(5!)$$",
        },
        {
          correct: false,
          label: "$$5!$$",
        },
        {
          correct: false,
          label: "$$2(6!)$$",
        },
        {
          correct: false,
          label: "$$\\frac{7!}{2}$$",
        },
      ],
    },
  },
};

export default item;
