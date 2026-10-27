import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$15$$",
        },
        {
          correct: true,
          label: "$$10$$",
        },
      ],
    },
  },
};

export default item;
