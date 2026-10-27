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
          label: "$$160$$",
        },
        {
          correct: true,
          label: "$$158$$",
        },
        {
          correct: false,
          label: "$$168$$",
        },
        {
          correct: false,
          label: "$$200$$",
        },
      ],
    },
  },
};

export default item;
