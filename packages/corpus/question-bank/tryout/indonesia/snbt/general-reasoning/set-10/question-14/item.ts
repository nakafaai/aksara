import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A,F,B,E,D,C$$",
        },
        {
          isCorrect: false,
          label: "$$E,B,F,A,C,D$$",
        },
        {
          isCorrect: false,
          label: "$$F,E,B,D,C,A$$",
        },
        {
          isCorrect: false,
          label: "$$A,C,D,F,E,B$$",
        },
        {
          isCorrect: true,
          label: "$$F,A,D,E,B,C$$",
        },
      ],
    },
  },
};

export default item;
