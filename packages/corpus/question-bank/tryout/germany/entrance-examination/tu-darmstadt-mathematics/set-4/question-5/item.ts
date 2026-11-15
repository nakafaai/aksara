import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$ Stunden",
        },
        {
          correct: false,
          label: "$$11$$ Stunden",
        },
        {
          correct: false,
          label: "$$8{,}5$$ Stunden",
        },
        {
          correct: false,
          label: "$$2$$ Stunden oder $$15$$ Stunden",
        },
        {
          correct: true,
          label: "$$15$$ Stunden",
        },
        {
          correct: false,
          label: "$$12$$ Stunden",
        },
      ],
    },
  },
};

export default item;
