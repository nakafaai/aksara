import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$11\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{11}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{13}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{10}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
