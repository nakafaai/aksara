import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$240{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$120{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$160{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$200{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$280{.}000$$ rupiah",
        },
      ],
    },
  },
};

export default item;
