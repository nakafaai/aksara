import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3\\text{ m}^2, 2\\text{ m}^2, 4\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$3\\text{ m}^2, 4\\text{ m}^2, 2\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$3\\text{ m}^2, 4\\text{ m}^2, 5\\text{ m}^2$$",
        },
        {
          isCorrect: true,
          label: "$$2\\text{ m}^2, 3\\text{ m}^2, 4\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$4\\text{ m}^2, 5\\text{ m}^2, 6\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
