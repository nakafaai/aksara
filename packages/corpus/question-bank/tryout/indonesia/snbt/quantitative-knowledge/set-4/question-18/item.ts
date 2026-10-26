import type { ItemSource } from "#corpus/question-bank/item";

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
          label: "$$P = Q$$",
        },
        {
          correct: false,
          label: "$$P = 2Q$$",
        },
        {
          correct: false,
          label: "Tidak dapat ditentukan",
        },
        {
          correct: true,
          label: "$$P < Q$$",
        },
      ],
    },
  },
};

export default item;
