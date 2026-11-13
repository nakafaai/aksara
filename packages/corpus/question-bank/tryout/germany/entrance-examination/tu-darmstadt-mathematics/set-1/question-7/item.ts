import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$20$$ Liter",
        },
        {
          correct: false,
          label: "$$10$$ Liter",
        },
        {
          correct: false,
          label: "$$15$$ Liter",
        },
        {
          correct: false,
          label: "$$25$$ Liter",
        },
        {
          correct: false,
          label: "$$30$$ Liter",
        },
        {
          correct: false,
          label: "$$35$$ Liter",
        },
      ],
    },
  },
};

export default item;
