import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "bahkan.",
        },
        {
          isCorrect: false,
          label: "dan.",
        },
        {
          isCorrect: false,
          label: "ketika.",
        },
        {
          isCorrect: true,
          label: "bahwa.",
        },
        {
          isCorrect: false,
          label: "jika.",
        },
      ],
    },
  },
};

export default item;
