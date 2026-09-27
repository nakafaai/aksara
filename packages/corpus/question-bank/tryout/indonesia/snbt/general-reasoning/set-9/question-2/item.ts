import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$60{.}000$$ suara",
        },
        {
          isCorrect: false,
          label: "$$10{.}000$$ suara",
        },
        {
          isCorrect: false,
          label: "$$30{.}000$$ suara",
        },
        {
          isCorrect: false,
          label: "$$50{.}000$$ suara",
        },
        {
          isCorrect: false,
          label: "$$80{.}000$$ suara",
        },
      ],
    },
  },
};

export default item;
