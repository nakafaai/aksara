import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4500$$",
        },
        {
          isCorrect: false,
          label: "$$4665$$",
        },
        {
          isCorrect: false,
          label: "$$4860$$",
        },
        {
          isCorrect: false,
          label: "$$9540$$",
        },
        {
          isCorrect: true,
          label: "$$4770$$",
        },
      ],
    },
  },
};

export default item;
