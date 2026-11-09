import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16$$ Liter",
        },
        {
          correct: false,
          label: "$$1{.}600$$ Liter",
        },
        {
          correct: false,
          label: "$$16{.}000$$ Liter",
        },
        {
          correct: false,
          label: "$$160{.}000$$ Liter",
        },
        {
          correct: false,
          label: "$$1{,}6$$ Liter",
        },
        {
          correct: true,
          label: "$$160$$ Liter",
        },
      ],
    },
  },
};

export default item;
