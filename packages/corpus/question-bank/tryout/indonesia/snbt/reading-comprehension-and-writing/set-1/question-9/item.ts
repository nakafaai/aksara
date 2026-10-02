import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kalimat (2).",
        },
        {
          isCorrect: false,
          label: "Kalimat (4).",
        },
        {
          isCorrect: true,
          label: "Kalimat (8).",
        },
        {
          isCorrect: false,
          label: "Kalimat (6).",
        },
        {
          isCorrect: false,
          label: "Kalimat (7).",
        },
      ],
    },
  },
};

export default item;
