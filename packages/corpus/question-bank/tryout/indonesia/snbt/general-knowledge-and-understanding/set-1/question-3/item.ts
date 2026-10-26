import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "oleh sebab itu.",
        },
        {
          correct: false,
          label: "bahwa.",
        },
        {
          correct: false,
          label: "sehingga.",
        },
        {
          correct: false,
          label: "karena.",
        },
        {
          correct: true,
          label: "tetapi.",
        },
      ],
    },
  },
};

export default item;
