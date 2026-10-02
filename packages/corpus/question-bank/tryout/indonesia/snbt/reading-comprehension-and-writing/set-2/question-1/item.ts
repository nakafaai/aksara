import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kalimat (2).",
        },
        {
          isCorrect: false,
          label: "kalimat (4).",
        },
        {
          isCorrect: false,
          label: "kalimat (13).",
        },
        {
          isCorrect: false,
          label: "kalimat (15).",
        },
        {
          isCorrect: true,
          label: "kalimat (12).",
        },
      ],
    },
  },
};

export default item;
