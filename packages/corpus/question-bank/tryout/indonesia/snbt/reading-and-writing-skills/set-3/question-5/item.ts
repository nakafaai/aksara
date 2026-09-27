import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Akibatnya",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian",
        },
        {
          isCorrect: true,
          label: "Selain itu",
        },
        {
          isCorrect: false,
          label: "Sebelum itu",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
