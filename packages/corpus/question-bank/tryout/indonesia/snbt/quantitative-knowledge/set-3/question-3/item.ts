import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ jam $$15$$ menit",
        },
        {
          isCorrect: false,
          label: "$$1$$ jam $$30$$ menit",
        },
        {
          isCorrect: true,
          label: "$$1$$ jam $$20$$ menit",
        },
        {
          isCorrect: false,
          label: "$$1$$ jam $$40$$ menit",
        },
        {
          isCorrect: false,
          label: "$$1$$ jam $$45$$ menit",
        },
      ],
    },
  },
};

export default item;
