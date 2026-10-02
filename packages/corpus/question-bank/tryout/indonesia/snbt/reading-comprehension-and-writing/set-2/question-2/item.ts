import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kalimat (12).",
        },
        {
          isCorrect: false,
          label: "kalimat (13).",
        },
        {
          isCorrect: false,
          label: "kalimat (14).",
        },
        {
          isCorrect: true,
          label: "kalimat (11).",
        },
        {
          isCorrect: false,
          label: "kalimat (15).",
        },
      ],
    },
  },
};

export default item;
