import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-9x^2 + 30x + 30$$",
        },
        {
          correct: false,
          label: "$$-9x^2 - 30x - 20$$",
        },
        {
          correct: false,
          label: "$$-9x^2 + 30$$",
        },
        {
          correct: false,
          label: "$$-9x^2 - 20$$",
        },
        {
          correct: true,
          label: "$$-9x^2 + 30x - 20$$",
        },
      ],
    },
  },
};

export default item;
