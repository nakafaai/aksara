import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-1$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
        {
          isCorrect: true,
          label: "$$-3$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$3$$",
        },
      ],
    },
  },
};

export default item;
