import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$8x$$",
        },
        {
          correct: false,
          label: "$$0$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$-8x$$",
        },
        {
          correct: false,
          label: "$$2x^2+8$$",
        },
        {
          correct: false,
          label: "$$4x$$",
        },
      ],
    },
  },
};

export default item;
