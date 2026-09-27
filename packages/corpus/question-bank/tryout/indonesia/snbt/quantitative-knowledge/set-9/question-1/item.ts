import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7\\pi\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$10\\pi\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$12\\pi\\text{ cm}$$",
        },
        {
          isCorrect: true,
          label: "$$16\\pi\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$14\\pi\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
