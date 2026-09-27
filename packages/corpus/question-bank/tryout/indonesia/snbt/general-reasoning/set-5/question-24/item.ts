import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: true,
          label: "$$11$$",
        },
        {
          isCorrect: false,
          label: "$$12$$",
        },
        {
          isCorrect: false,
          label: "$$13$$",
        },
      ],
    },
  },
};

export default item;
