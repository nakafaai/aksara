import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$47$$",
        },
        {
          isCorrect: false,
          label: "$$51$$",
        },
        {
          isCorrect: false,
          label: "$$90$$",
        },
        {
          isCorrect: false,
          label: "$$92$$",
        },
        {
          isCorrect: true,
          label: "$$85$$",
        },
      ],
    },
  },
};

export default item;
