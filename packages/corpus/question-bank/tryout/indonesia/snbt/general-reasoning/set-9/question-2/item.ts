import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$60{.}000$$ suara",
        },
        {
          correct: false,
          label: "$$10{.}000$$ suara",
        },
        {
          correct: false,
          label: "$$30{.}000$$ suara",
        },
        {
          correct: false,
          label: "$$50{.}000$$ suara",
        },
        {
          correct: false,
          label: "$$80{.}000$$ suara",
        },
      ],
    },
  },
};

export default item;
