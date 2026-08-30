import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Evidence and trade-offs in choosing an office layout",
        },
        {
          isCorrect: false,
          label: "How to calculate the construction cost of an office",
        },
        {
          isCorrect: false,
          label: "Why email should replace every meeting",
        },
        {
          isCorrect: false,
          label: "The history of corporate architecture",
        },
        {
          isCorrect: false,
          label: "How to decorate a private office",
        },
      ],
    },
  },
};

export default item;
