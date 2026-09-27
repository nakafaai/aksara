import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-20$$",
        },
        {
          isCorrect: false,
          label: "$$-12$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$12$$",
        },
        {
          isCorrect: true,
          label: "$$20$$",
        },
      ],
    },
  },
};

export default item;
