import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "meskipun.",
        },
        {
          correct: false,
          label: "agar.",
        },
        {
          correct: false,
          label: "kecuali.",
        },
        {
          correct: true,
          label: "karena.",
        },
        {
          correct: false,
          label: "setelah.",
        },
      ],
    },
  },
};

export default item;
