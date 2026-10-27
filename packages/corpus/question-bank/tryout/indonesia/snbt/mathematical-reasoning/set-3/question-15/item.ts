import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}15$$ bagian",
        },
        {
          correct: false,
          label: "$$0{,}3$$ bagian",
        },
        {
          correct: true,
          label: "$$0{,}75$$ bagian",
        },
        {
          correct: false,
          label: "$$0{,}45$$ bagian",
        },
        {
          correct: false,
          label: "$$0{,}6$$ bagian",
        },
      ],
    },
  },
};

export default item;
