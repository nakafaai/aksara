import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$118$$",
        },
        {
          isCorrect: false,
          label: "$$177$$",
        },
        {
          isCorrect: true,
          label: "$$236$$",
        },
        {
          isCorrect: false,
          label: "$$241$$",
        },
        {
          isCorrect: false,
          label: "$$295$$",
        },
      ],
    },
  },
};

export default item;
