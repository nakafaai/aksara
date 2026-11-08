import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$-1$$",
        },
        {
          correct: false,
          label: "$$4x+1$$",
        },
        {
          correct: false,
          label: "$$4x-1$$",
        },
        {
          correct: false,
          label: "$$1-8x$$",
        },
        {
          correct: false,
          label: "$$8x^2-8x+1$$",
        },
      ],
    },
  },
};

export default item;
