import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$A = B$$",
        },
        {
          correct: false,
          label: "$$A = 2B$$",
        },
        {
          correct: true,
          label: "$$A > B$$",
        },
        {
          correct: false,
          label: "$$A < B$$",
        },
        {
          correct: false,
          label: "$$A = \\frac{1}{2}B$$",
        },
      ],
    },
  },
};

export default item;
