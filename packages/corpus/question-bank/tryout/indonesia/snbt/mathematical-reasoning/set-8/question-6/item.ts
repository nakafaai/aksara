import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$6$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$12$$",
        },
        {
          isCorrect: true,
          label: "$$9$$",
        },
      ],
    },
  },
};

export default item;
