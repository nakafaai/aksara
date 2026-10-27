import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-22
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$P > Q$$",
        },
        {
          correct: false,
          label: "$$Q > P$$",
        },
        {
          correct: false,
          label: "$$P = 2Q$$",
        },
        {
          correct: true,
          label: "$$P = Q$$",
        },
        {
          correct: false,
          label:
            "Hubungan antara $$P$$ dan $$Q$$ tidak dapat ditentukan dari informasi yang diberikan.",
        },
      ],
    },
  },
};

export default item;
