import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "tangguh (kalimat (1)).",
        },
        {
          isCorrect: true,
          label: "memperkecil (kalimat (7)).",
        },
        {
          isCorrect: false,
          label: "akibat (kalimat (2)).",
        },
        {
          isCorrect: false,
          label: "memenuhi (kalimat (3)).",
        },
        {
          isCorrect: false,
          label: "mengakui (kalimat (4)).",
        },
      ],
    },
  },
};

export default item;
