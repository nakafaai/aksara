import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kalimat (4).",
        },
        {
          correct: false,
          label: "kalimat (7).",
        },
        {
          correct: false,
          label: "kalimat (6).",
        },
        {
          correct: false,
          label: "kalimat (5).",
        },
        {
          correct: false,
          label: "kalimat (3).",
        },
      ],
    },
  },
};

export default item;
