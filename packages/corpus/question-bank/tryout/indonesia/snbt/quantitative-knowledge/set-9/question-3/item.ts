import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$70^\\circ$$",
        },
        {
          isCorrect: false,
          label: "$$45^\\circ$$",
        },
        {
          isCorrect: false,
          label: "$$65^\\circ$$",
        },
        {
          isCorrect: false,
          label: "$$75^\\circ$$",
        },
        {
          isCorrect: false,
          label: "$$80^\\circ$$",
        },
      ],
    },
  },
};

export default item;
