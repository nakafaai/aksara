import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pertumbuhan.",
        },
        {
          isCorrect: true,
          label: "menurun.",
        },
        {
          isCorrect: false,
          label: "progresif.",
        },
        {
          isCorrect: false,
          label: "menaiki.",
        },
        {
          isCorrect: false,
          label: "meninggi.",
        },
      ],
    },
  },
};

export default item;
