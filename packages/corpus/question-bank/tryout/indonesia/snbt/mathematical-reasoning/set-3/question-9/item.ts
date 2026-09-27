import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$21$$ menit atau $$10$$ menit",
        },
        {
          isCorrect: false,
          label: "$$15$$ menit atau $$16$$ menit",
        },
        {
          isCorrect: false,
          label: "$$30$$ menit atau $$40$$ menit",
        },
        {
          isCorrect: true,
          label: "$$70$$ menit atau $$30$$ menit",
        },
        {
          isCorrect: false,
          label: "$$10$$ menit atau $$30$$ menit",
        },
      ],
    },
  },
};

export default item;
