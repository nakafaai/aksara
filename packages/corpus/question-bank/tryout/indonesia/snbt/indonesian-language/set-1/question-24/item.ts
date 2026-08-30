import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat (6)",
        },
        {
          isCorrect: false,
          label: "Kalimat (7)",
        },
        {
          isCorrect: false,
          label: "Kalimat (8)",
        },
        {
          isCorrect: false,
          label: "Kalimat (9)",
        },
        {
          isCorrect: true,
          label: "Kalimat (10)",
        },
      ],
    },
  },
};

export default item;
