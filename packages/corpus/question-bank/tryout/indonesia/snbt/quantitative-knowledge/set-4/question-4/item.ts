import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4x^2 - 2x + 1$$",
        },
        {
          correct: true,
          label: "$$4x^2 - 6x + 2$$",
        },
        {
          correct: false,
          label: "$$4x^2 - 3x + 1$$",
        },
        {
          correct: false,
          label: "$$4x^2 - 4x + 2$$",
        },
        {
          correct: false,
          label: "$$4x^2 - 5x + 2$$",
        },
      ],
    },
  },
};

export default item;
