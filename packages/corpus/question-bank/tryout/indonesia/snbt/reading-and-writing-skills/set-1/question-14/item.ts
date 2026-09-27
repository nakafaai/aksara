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
          label: "kalimat (2).",
        },
        {
          isCorrect: false,
          label: "kalimat (5).",
        },
        {
          isCorrect: false,
          label: "kalimat (7).",
        },
        {
          isCorrect: false,
          label: "kalimat (9).",
        },
      ],
    },
  },
};

export default item;
