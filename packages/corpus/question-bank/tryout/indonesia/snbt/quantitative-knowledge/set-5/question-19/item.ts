import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
        {
          isCorrect: false,
          label: "$$-3$$",
        },
        {
          isCorrect: true,
          label: "$$-4$$",
        },
      ],
    },
  },
};

export default item;
