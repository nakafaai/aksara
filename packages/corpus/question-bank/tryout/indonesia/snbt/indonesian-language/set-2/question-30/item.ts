import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Baik letaknya untuk mendukung suatu tujuan",
        },
        {
          isCorrect: false,
          label: "Disusun berdasarkan strategi militer",
        },
        {
          isCorrect: false,
          label: "Berkaitan langsung dengan catatan sejarah",
        },
        {
          isCorrect: false,
          label: "Mencakup seluruh kebudayaan yang ada",
        },
        {
          isCorrect: false,
          label: "Terpisah dari jalur perdagangan pesisir",
        },
      ],
    },
  },
};

export default item;
