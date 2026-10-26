import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "jarang.",
        },
        {
          correct: true,
          label: "sering.",
        },
        {
          correct: false,
          label: "tiba-tiba.",
        },
        {
          correct: false,
          label: "terpisah.",
        },
        {
          correct: false,
          label: "mungkin.",
        },
      ],
    },
  },
};

export default item;
