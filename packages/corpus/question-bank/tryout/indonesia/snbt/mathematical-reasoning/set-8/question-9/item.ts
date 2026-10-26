import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2-\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$\\sqrt2-1$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$\\sqrt2$$",
        },
        {
          correct: true,
          label: "$$2-\\sqrt2$$",
        },
      ],
    },
  },
};

export default item;
