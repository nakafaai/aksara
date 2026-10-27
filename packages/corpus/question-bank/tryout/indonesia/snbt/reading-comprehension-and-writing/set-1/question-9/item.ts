import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (2).",
        },
        {
          correct: false,
          label: "Kalimat (4).",
        },
        {
          correct: true,
          label: "Kalimat (8).",
        },
        {
          correct: false,
          label: "Kalimat (6).",
        },
        {
          correct: false,
          label: "Kalimat (7).",
        },
      ],
    },
  },
};

export default item;
