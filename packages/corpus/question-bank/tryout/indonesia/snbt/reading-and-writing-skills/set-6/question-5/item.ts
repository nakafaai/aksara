import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Oleh sebab itu",
        },
        {
          isCorrect: false,
          label: "Bahkan",
        },
        {
          isCorrect: true,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Sebelumnya",
        },
        {
          isCorrect: false,
          label: "Sesudahnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
