import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: false,
          label: "$$150$$",
        },
        {
          correct: false,
          label: "$$180$$",
        },
        {
          correct: false,
          label: "$$245$$",
        },
        {
          correct: true,
          label: "$$220$$",
        },
      ],
    },
  },
};

export default item;
