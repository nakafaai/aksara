import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Selanjutnya",
        },
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Seandainya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
