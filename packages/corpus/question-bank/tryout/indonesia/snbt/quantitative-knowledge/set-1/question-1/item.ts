import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: true,
          label: "$$19$$",
        },
        {
          correct: false,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
      ],
    },
  },
};

export default item;
