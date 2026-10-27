import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat (2).",
        },
        {
          correct: false,
          label: "kalimat (4).",
        },
        {
          correct: false,
          label: "kalimat (13).",
        },
        {
          correct: false,
          label: "kalimat (15).",
        },
        {
          correct: true,
          label: "kalimat (12).",
        },
      ],
    },
  },
};

export default item;
