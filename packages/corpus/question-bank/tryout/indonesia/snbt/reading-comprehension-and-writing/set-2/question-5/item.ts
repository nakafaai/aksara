import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat (1).",
        },
        {
          correct: false,
          label: "kalimat (5).",
        },
        {
          correct: true,
          label: "kalimat (10).",
        },
        {
          correct: false,
          label: "kalimat (6).",
        },
        {
          correct: false,
          label: "kalimat (8).",
        },
      ],
    },
  },
};

export default item;
