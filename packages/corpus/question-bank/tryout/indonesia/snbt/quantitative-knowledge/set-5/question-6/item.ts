import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$P < Q$$",
        },
        {
          correct: false,
          label: "$$P = Q$$",
        },
        {
          correct: false,
          label: "$$P + Q = 1$$",
        },
        {
          correct: true,
          label: "$$P > Q$$",
        },
        {
          correct: false,
          label:
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu pilihan.",
        },
      ],
    },
  },
};

export default item;
