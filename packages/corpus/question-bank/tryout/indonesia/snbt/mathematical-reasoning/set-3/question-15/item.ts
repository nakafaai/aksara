import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}15$$ bagian",
        },
        {
          isCorrect: false,
          label: "$$0{,}3$$ bagian",
        },
        {
          isCorrect: true,
          label: "$$0{,}75$$ bagian",
        },
        {
          isCorrect: false,
          label: "$$0{,}45$$ bagian",
        },
        {
          isCorrect: false,
          label: "$$0{,}6$$ bagian",
        },
      ],
    },
  },
};

export default item;
