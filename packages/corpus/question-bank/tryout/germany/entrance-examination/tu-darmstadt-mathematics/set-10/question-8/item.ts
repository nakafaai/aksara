import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3\\sqrt3\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt3\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$2\\sqrt6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{30}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
