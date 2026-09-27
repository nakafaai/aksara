import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$80\\%$$",
        },
        {
          isCorrect: false,
          label: "$$40\\%$$",
        },
        {
          isCorrect: false,
          label: "$$25\\%$$",
        },
        {
          isCorrect: true,
          label: "$$33\\frac{1}{3}\\%$$",
        },
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
      ],
    },
  },
};

export default item;
