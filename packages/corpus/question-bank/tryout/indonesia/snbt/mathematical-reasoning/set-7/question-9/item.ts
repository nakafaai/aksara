import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$40$$",
        },
        {
          correct: false,
          label: "$$42$$",
        },
        {
          correct: false,
          label: "$$45$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
        {
          correct: false,
          label: "$$60$$",
        },
      ],
    },
  },
};

export default item;
