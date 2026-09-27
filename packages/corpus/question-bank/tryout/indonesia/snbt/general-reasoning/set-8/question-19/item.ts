import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$60$$ dan $$155$$ orang",
        },
        {
          isCorrect: true,
          label: "$$60$$ dan $$145$$ orang",
        },
        {
          isCorrect: false,
          label: "$$62$$ dan $$155$$ orang",
        },
        {
          isCorrect: false,
          label: "$$62$$ dan $$145$$ orang",
        },
        {
          isCorrect: false,
          label: "$$65$$ dan $$155$$ orang",
        },
      ],
    },
  },
};

export default item;
