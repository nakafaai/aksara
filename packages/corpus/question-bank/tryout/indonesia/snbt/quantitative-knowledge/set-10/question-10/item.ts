import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15$$ menit",
        },
        {
          isCorrect: false,
          label: "$$30$$ menit",
        },
        {
          isCorrect: false,
          label: "$$45$$ menit",
        },
        {
          isCorrect: true,
          label: "$$60$$ menit",
        },
        {
          isCorrect: false,
          label: "$$75$$ menit",
        },
      ],
    },
  },
};

export default item;
