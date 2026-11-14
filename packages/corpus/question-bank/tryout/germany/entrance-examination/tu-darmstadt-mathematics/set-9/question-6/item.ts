import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\sqrt3\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\left(2+2\\sqrt2\\right)\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$2\\sqrt5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt2\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
