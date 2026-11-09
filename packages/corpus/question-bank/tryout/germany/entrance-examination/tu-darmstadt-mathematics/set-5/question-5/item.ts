import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$8\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$32\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$48\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$64\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$16\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
