import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "oleh sebab itu.",
        },
        {
          isCorrect: false,
          label: "bahwa.",
        },
        {
          isCorrect: false,
          label: "sehingga.",
        },
        {
          isCorrect: false,
          label: "karena.",
        },
        {
          isCorrect: true,
          label: "tetapi.",
        },
      ],
    },
  },
};

export default item;
