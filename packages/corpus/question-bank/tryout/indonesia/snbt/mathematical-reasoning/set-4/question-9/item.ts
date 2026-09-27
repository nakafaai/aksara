import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\text{ m}$$ dan $$6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$3\\text{ m}$$ dan $$7\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\text{ m}$$ dan $$4\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$5\\text{ m}$$ dan $$5\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ m}$$ dan $$2\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
