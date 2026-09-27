import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: true,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A$$ dan $$C$$ sama-sama terbaik",
        },
        {
          isCorrect: false,
          label: "$$B$$ dan $$C$$ sama-sama terbaik",
        },
      ],
    },
  },
};

export default item;
