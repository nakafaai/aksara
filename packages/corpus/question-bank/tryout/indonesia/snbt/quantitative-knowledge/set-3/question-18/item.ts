import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
      ],
    },
  },
};

export default item;
