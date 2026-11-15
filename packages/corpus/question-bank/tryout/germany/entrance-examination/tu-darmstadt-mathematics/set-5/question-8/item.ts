import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$64\\pi\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$216\\pi\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$54\\pi\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$18\\pi\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$27\\pi\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$48\\pi\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
