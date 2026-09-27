import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$49{,}5$$ hari",
        },
        {
          isCorrect: false,
          label: "$$48$$ hari",
        },
        {
          isCorrect: false,
          label: "$$48{,}5$$ hari",
        },
        {
          isCorrect: false,
          label: "$$49$$ hari",
        },
        {
          isCorrect: false,
          label: "$$50$$ hari",
        },
      ],
    },
  },
};

export default item;
