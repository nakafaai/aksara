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
          label: "Selain itu",
        },
        {
          isCorrect: false,
          label: "Dengan kata lain",
        },
        {
          isCorrect: false,
          label: "Sebelumnya",
        },
        {
          isCorrect: true,
          label: "Meskipun demikian",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
