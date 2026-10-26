import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sebelum kalimat (5).",
        },
        {
          correct: false,
          label: "setelah kalimat (1).",
        },
        {
          correct: false,
          label: "sebelum kalimat (6).",
        },
        {
          correct: true,
          label: "setelah kalimat (2).",
        },
        {
          correct: false,
          label: "setelah kalimat (7).",
        },
      ],
    },
  },
};

export default item;
