import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7\\text{ hari}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ hari}$$",
        },
        {
          isCorrect: false,
          label: "$$9\\text{ hari}$$",
        },
        {
          isCorrect: true,
          label: "$$10\\text{ hari}$$",
        },
        {
          isCorrect: false,
          label: "$$11\\text{ hari}$$",
        },
      ],
    },
  },
};

export default item;
