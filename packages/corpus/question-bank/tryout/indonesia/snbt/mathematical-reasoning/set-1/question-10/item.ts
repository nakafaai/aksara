import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$100$$",
        },
        {
          correct: false,
          label: "$$105$$",
        },
        {
          correct: false,
          label: "$$115$$",
        },
        {
          correct: true,
          label: "$$110$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
      ],
    },
  },
};

export default item;
