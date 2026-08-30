import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat (1)",
        },
        {
          isCorrect: false,
          label: "Kalimat (7)",
        },
        {
          isCorrect: false,
          label: "Kalimat (3)",
        },
        {
          isCorrect: true,
          label: "Kalimat (10)",
        },
        {
          isCorrect: false,
          label: "Kalimat (8)",
        },
      ],
    },
  },
};

export default item;
