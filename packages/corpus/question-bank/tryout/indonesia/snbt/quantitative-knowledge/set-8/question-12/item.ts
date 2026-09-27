import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$6{,}25$$",
        },
        {
          isCorrect: false,
          label: "$$6{,}50$$",
        },
        {
          isCorrect: false,
          label: "$$7{,}50$$",
        },
        {
          isCorrect: true,
          label: "$$8{,}25$$",
        },
        {
          isCorrect: false,
          label: "$$7{,}75$$",
        },
      ],
    },
  },
};

export default item;
