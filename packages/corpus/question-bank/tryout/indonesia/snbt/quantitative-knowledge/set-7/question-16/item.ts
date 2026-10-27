import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$240{.}000$$ rupiah",
        },
        {
          correct: false,
          label: "$$120{.}000$$ rupiah",
        },
        {
          correct: false,
          label: "$$160{.}000$$ rupiah",
        },
        {
          correct: false,
          label: "$$200{.}000$$ rupiah",
        },
        {
          correct: false,
          label: "$$280{.}000$$ rupiah",
        },
      ],
    },
  },
};

export default item;
