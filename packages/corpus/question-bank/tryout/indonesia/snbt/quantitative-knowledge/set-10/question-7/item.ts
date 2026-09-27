import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-14$$",
        },
        {
          isCorrect: false,
          label: "$$-8$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: true,
          label: "$$14$$",
        },
      ],
    },
  },
};

export default item;
