import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$40$$",
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
