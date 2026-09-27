import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sementara itu",
        },
        {
          isCorrect: true,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian",
        },
        {
          isCorrect: false,
          label: "Sebagai contoh",
        },
        {
          isCorrect: false,
          label: "Sebelumnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
