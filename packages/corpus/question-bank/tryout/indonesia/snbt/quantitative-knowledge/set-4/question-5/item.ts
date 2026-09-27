import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
          label: "Jika hanya (4) yang betul.",
        },
        {
          isCorrect: false,
          label: "Jika semuanya betul.",
        },
        {
          isCorrect: true,
          label: "Jika (2) dan (4) yang betul.",
        },
      ],
    },
  },
};

export default item;
