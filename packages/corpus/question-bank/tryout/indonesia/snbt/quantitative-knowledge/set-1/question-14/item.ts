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
          label: "$$-15$$",
        },
        {
          correct: false,
          label: "$$-12$$",
        },
        {
          correct: false,
          label: "$$12$$",
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
