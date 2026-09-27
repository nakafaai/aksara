import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kalimat (1).",
        },
        {
          isCorrect: false,
          label: "kalimat (5).",
        },
        {
          isCorrect: true,
          label: "kalimat (10).",
        },
        {
          isCorrect: false,
          label: "kalimat (6).",
        },
        {
          isCorrect: false,
          label: "kalimat (8).",
        },
      ],
    },
  },
};

export default item;
