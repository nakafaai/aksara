import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$19$$",
        },
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: false,
          label: "$$38$$",
        },
        {
          isCorrect: false,
          label: "$$28$$",
        },
        {
          isCorrect: false,
          label: "$$14$$",
        },
      ],
    },
  },
};

export default item;
