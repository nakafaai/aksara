import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$90$$",
        },
        {
          isCorrect: false,
          label: "$$80$$",
        },
        {
          isCorrect: false,
          label: "$$70$$",
        },
        {
          isCorrect: false,
          label: "$$65$$",
        },
        {
          isCorrect: true,
          label: "$$45$$",
        },
      ],
    },
  },
};

export default item;
