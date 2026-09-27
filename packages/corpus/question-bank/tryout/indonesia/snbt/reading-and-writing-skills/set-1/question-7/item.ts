import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kalimat (4).",
        },
        {
          isCorrect: false,
          label: "kalimat (7).",
        },
        {
          isCorrect: false,
          label: "kalimat (6).",
        },
        {
          isCorrect: false,
          label: "kalimat (5).",
        },
        {
          isCorrect: false,
          label: "kalimat (3).",
        },
      ],
    },
  },
};

export default item;
