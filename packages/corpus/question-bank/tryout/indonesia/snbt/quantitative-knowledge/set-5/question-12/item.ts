import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Jika semua betul.",
        },
        {
          isCorrect: false,
          label: "Jika (1), (2), dan (3) yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika (1) dan (3) yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika (2) dan (4) yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika (4) saja yang betul.",
        },
      ],
    },
  },
};

export default item;
