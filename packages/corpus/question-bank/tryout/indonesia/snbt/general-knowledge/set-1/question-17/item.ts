import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "paman.",
        },
        {
          isCorrect: false,
          label: "bangsa.",
        },
        {
          isCorrect: false,
          label: "pahlawan.",
        },
        {
          isCorrect: true,
          label: "gugur.",
        },
        {
          isCorrect: false,
          label: "musuh.",
        },
      ],
    },
  },
};

export default item;
