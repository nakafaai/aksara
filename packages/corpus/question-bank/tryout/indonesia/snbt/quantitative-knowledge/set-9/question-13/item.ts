import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14 \\text{ dan } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ dan } 2$$",
        },
        {
          isCorrect: false,
          label: "$$12 \\text{ dan } 2$$",
        },
        {
          isCorrect: false,
          label: "$$8 \\text{ dan } 2$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ dan } 2$$",
        },
      ],
    },
  },
};

export default item;
