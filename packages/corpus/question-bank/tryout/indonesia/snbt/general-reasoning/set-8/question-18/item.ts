import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{D}$$",
        },
        {
          correct: false,
          label: "$$\\text{A}$$",
        },
        {
          correct: false,
          label: "$$\\text{B}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}$$",
        },
        {
          correct: false,
          label: "$$\\text{E}$$",
        },
      ],
    },
  },
};

export default item;
