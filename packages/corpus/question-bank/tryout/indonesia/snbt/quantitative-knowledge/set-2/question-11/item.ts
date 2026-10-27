import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-22
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x \\in [2, 10)$$",
        },
        {
          correct: false,
          label: "$$x \\in [0, 10)$$",
        },
        {
          correct: false,
          label: "$$x \\in [0, 2) \\cup [5, 10)$$",
        },
        {
          correct: false,
          label: "$$x \\in [2, 8)$$",
        },
        {
          correct: false,
          label: "$$x \\in [5, 10)$$",
        },
      ],
    },
  },
};

export default item;
