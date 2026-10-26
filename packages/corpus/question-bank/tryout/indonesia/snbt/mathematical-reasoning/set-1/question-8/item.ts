import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$5 - x$$",
        },
        {
          correct: false,
          label: "$$x - 5$$",
        },
        {
          correct: false,
          label: "$$x + 5$$",
        },
        {
          correct: false,
          label: "$$5 - 2x$$",
        },
        {
          correct: false,
          label: "$$2x - 5$$",
        },
      ],
    },
  },
};

export default item;
