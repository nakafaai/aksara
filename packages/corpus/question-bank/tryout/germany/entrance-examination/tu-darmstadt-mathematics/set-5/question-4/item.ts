import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2{,}5$$ Stunden",
        },
        {
          correct: false,
          label: "$$6{,}5$$ Stunden",
        },
        {
          correct: false,
          label: "$$12$$ Stunden",
        },
        {
          correct: false,
          label: "$$\\frac{19}{3}$$ Stunden",
        },
        {
          correct: true,
          label: "$$9{,}5$$ Stunden",
        },
        {
          correct: false,
          label: "$$14{,}5$$ Stunden",
        },
      ],
    },
  },
};

export default item;
