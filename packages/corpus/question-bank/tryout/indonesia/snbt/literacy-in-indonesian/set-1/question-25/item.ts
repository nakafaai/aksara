import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat (13)",
        },
        {
          isCorrect: false,
          label: "Kalimat (15)",
        },
        {
          isCorrect: true,
          label: "Kalimat (9)",
        },
        {
          isCorrect: false,
          label: "Kalimat (7)",
        },
        {
          isCorrect: false,
          label: "Kalimat (12)",
        },
      ],
    },
  },
};

export default item;
