import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(2)$$",
        },
        {
          isCorrect: false,
          label: "$$(5)$$",
        },
        {
          isCorrect: false,
          label: "$$(10)$$",
        },
        {
          isCorrect: true,
          label: "$$(7)$$",
        },
        {
          isCorrect: false,
          label: "$$(4)$$",
        },
      ],
    },
  },
};

export default item;
