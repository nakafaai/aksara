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
          correct: true,
          label: "terjadi ketika.",
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
          correct: false,
          label: "setelah.",
        },
      ],
    },
  },
};

export default item;
