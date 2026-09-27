import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Benar, Benar, Benar",
        },
        {
          isCorrect: false,
          label: "Benar, Salah, Salah",
        },
        {
          isCorrect: false,
          label: "Salah, Benar, Benar",
        },
        {
          isCorrect: true,
          label: "Benar, Benar, Salah",
        },
        {
          isCorrect: false,
          label: "Salah, Salah, Benar",
        },
      ],
    },
  },
};

export default item;
