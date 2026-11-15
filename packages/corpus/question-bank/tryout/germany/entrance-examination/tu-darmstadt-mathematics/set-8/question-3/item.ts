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
          correct: true,
          label: "$$(6-3\\sqrt3)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(6-3\\sqrt2)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(3\\sqrt3-3)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(6-2\\sqrt3)\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
