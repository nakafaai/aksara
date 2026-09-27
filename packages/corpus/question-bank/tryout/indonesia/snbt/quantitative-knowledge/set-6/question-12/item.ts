import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$30^\\circ$$",
        },
        {
          isCorrect: false,
          label: "$$40^\\circ$$",
        },
        {
          isCorrect: true,
          label: "$$20^\\circ$$",
        },
        {
          isCorrect: false,
          label: "$$50^\\circ$$",
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
