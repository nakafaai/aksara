import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2x^2 + 8x - 6$$",
        },
        {
          correct: false,
          label: "$$2x^2 + 8x - 9$$",
        },
        {
          correct: true,
          label: "$$2x^2 + 8x - 11$$",
        },
        {
          correct: false,
          label: "$$2x^2 + 4x - 6$$",
        },
        {
          correct: false,
          label: "$$2x^2 + 4x - 9$$",
        },
      ],
    },
  },
};

export default item;
