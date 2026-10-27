import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-22
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Benar, Benar, Benar",
        },
        {
          correct: false,
          label: "Benar, Salah, Salah",
        },
        {
          correct: false,
          label: "Salah, Benar, Benar",
        },
        {
          correct: true,
          label: "Benar, Benar, Salah",
        },
        {
          correct: false,
          label: "Salah, Salah, Benar",
        },
      ],
    },
  },
};

export default item;
