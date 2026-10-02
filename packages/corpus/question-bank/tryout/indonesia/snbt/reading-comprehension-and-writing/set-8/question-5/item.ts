import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Meskipun demikian",
        },
        {
          isCorrect: false,
          label: "Sementara itu",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: true,
          label: "Berdasarkan hal itu",
        },
        {
          isCorrect: false,
          label: "Di samping itu",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
