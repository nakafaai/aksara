import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1, 2, 3$$",
        },
        {
          isCorrect: false,
          label: "$$1 \\text{ dan } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ dan } 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 \\text{ saja}$$",
        },
        {
          isCorrect: false,
          label: "semua",
        },
      ],
    },
  },
};

export default item;
