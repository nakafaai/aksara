import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40$$",
        },
        {
          correct: false,
          label: "$$42$$",
        },
        {
          correct: false,
          label: "$$46$$",
        },
        {
          correct: false,
          label: "$$48$$",
        },
        {
          correct: true,
          label: "$$44$$",
        },
      ],
    },
  },
};

export default item;
