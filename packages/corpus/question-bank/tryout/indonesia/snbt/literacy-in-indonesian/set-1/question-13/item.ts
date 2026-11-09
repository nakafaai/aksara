import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (1)",
        },
        {
          correct: true,
          label: "Kalimat (10)",
        },
        {
          correct: false,
          label: "Kalimat (7)",
        },
        {
          correct: false,
          label: "Kalimat (3)",
        },
        {
          correct: false,
          label: "Kalimat (8)",
        },
      ],
    },
  },
};

export default item;
