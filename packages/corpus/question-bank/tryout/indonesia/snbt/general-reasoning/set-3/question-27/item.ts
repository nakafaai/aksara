import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$750$$",
        },
        {
          isCorrect: true,
          label: "$$800$$",
        },
        {
          isCorrect: false,
          label: "$$780$$",
        },
        {
          isCorrect: false,
          label: "$$820$$",
        },
        {
          isCorrect: false,
          label: "$$850$$",
        },
      ],
    },
  },
};

export default item;
