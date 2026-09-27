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
          isCorrect: true,
          label: "$$-2$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
      ],
    },
  },
};

export default item;
