import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$6\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$7\\text{ menit}$$",
        },
        {
          isCorrect: true,
          label: "$$8\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$9\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$10\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
