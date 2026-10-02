import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sebelum kalimat (5).",
        },
        {
          isCorrect: false,
          label: "setelah kalimat (1).",
        },
        {
          isCorrect: false,
          label: "sebelum kalimat (6).",
        },
        {
          isCorrect: true,
          label: "setelah kalimat (2).",
        },
        {
          isCorrect: false,
          label: "setelah kalimat (7).",
        },
      ],
    },
  },
};

export default item;
