import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sebelum kalimat (7).",
        },
        {
          isCorrect: true,
          label: "antara kalimat (5) dan (6).",
        },
        {
          isCorrect: false,
          label: "antara kalimat (1) dan (2).",
        },
        {
          isCorrect: false,
          label: "setelah kalimat (3).",
        },
        {
          isCorrect: false,
          label: "antara kalimat (4) dan (5).",
        },
      ],
    },
  },
};

export default item;
