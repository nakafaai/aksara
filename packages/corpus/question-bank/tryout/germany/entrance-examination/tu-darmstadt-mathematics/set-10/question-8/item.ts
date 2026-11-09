import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8$$ Liter",
        },
        {
          correct: false,
          label: "$$80$$ Liter",
        },
        {
          correct: false,
          label: "$$800$$ Liter",
        },
        {
          correct: false,
          label: "$$80{.}000$$ Liter",
        },
        {
          correct: false,
          label: "$$8{.}000{.}000$$ Liter",
        },
        {
          correct: true,
          label: "$$8{.}000$$ Liter",
        },
      ],
    },
  },
};

export default item;
