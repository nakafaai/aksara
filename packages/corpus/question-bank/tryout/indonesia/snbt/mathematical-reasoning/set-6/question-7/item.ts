import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2520$$ unit",
        },
        {
          isCorrect: false,
          label: "$$1960$$ unit",
        },
        {
          isCorrect: false,
          label: "$$2000$$ unit",
        },
        {
          isCorrect: false,
          label: "$$2720$$ unit",
        },
        {
          isCorrect: false,
          label: "$$3000$$ unit",
        },
      ],
    },
  },
};

export default item;
