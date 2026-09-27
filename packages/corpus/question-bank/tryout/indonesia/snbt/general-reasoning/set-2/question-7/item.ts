import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$56$$",
        },
        {
          isCorrect: false,
          label: "$$63$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$80$$",
        },
        {
          isCorrect: true,
          label: "$$48$$",
        },
      ],
    },
  },
};

export default item;
