import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{119}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$13\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$17\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$34\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
