import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Sebelum pengukuran",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: true,
          label: "Dalam kondisi tersebut",
        },
        {
          isCorrect: false,
          label: "Misalnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
