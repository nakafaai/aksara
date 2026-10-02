import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Demikian pula",
        },
        {
          isCorrect: true,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Setelah itu",
        },
        {
          isCorrect: false,
          label: "Bahkan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
