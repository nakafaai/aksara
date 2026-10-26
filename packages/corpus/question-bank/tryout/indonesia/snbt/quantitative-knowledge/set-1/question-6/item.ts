import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4x + 3y = 25$$",
        },
        {
          correct: false,
          label: "$$3x + 4y = 24$$",
        },
        {
          correct: false,
          label: "$$3x - 4y = 0$$",
        },
        {
          correct: false,
          label: "$$-3x + 4y = 25$$",
        },
        {
          correct: true,
          label: "$$4x - 3y = 7$$",
        },
      ],
    },
  },
};

export default item;
