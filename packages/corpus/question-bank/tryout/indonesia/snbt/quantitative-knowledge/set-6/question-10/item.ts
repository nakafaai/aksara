import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: true,
          label: "$$34$$",
        },
        {
          isCorrect: false,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$24$$",
        },
        {
          isCorrect: false,
          label: "$$44$$",
        },
      ],
    },
  },
};

export default item;
