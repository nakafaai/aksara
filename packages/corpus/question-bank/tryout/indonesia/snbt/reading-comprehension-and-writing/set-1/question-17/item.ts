import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sebelum kalimat (7).",
        },
        {
          correct: true,
          label: "antara kalimat (5) dan (6).",
        },
        {
          correct: false,
          label: "antara kalimat (1) dan (2).",
        },
        {
          correct: false,
          label: "setelah kalimat (3).",
        },
        {
          correct: false,
          label: "antara kalimat (4) dan (5).",
        },
      ],
    },
  },
};

export default item;
