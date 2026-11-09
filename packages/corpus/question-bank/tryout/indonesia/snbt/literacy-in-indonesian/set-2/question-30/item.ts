import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Baik letaknya untuk mendukung suatu tujuan",
        },
        {
          correct: false,
          label: "Disusun berdasarkan strategi militer",
        },
        {
          correct: false,
          label: "Berkaitan langsung dengan catatan sejarah",
        },
        {
          correct: false,
          label: "Mencakup seluruh kebudayaan yang ada",
        },
        {
          correct: false,
          label: "Terpisah dari jalur perdagangan pesisir",
        },
      ],
    },
  },
};

export default item;
