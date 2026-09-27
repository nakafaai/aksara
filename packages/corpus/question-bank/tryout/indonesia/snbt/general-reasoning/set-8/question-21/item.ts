import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$96$$",
        },
        {
          isCorrect: false,
          label: "$$48$$",
        },
        {
          isCorrect: false,
          label: "$$64$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$192$$",
        },
      ],
    },
  },
};

export default item;
