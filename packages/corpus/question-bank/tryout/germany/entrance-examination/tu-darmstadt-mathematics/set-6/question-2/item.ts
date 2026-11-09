import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(x+2)(x-3)(x+3)$$",
        },
        {
          correct: false,
          label: "$$(x-2)(x-3)^2$$",
        },
        {
          correct: false,
          label: "$$(x-2)(x^2+9)$$",
        },
        {
          correct: false,
          label: "$$(2-x)(x-3)(x+3)$$",
        },
        {
          correct: true,
          label: "$$(x-2)(x-3)(x+3)$$",
        },
        {
          correct: false,
          label: "$$(x-2)(x-9)(x+9)$$",
        },
      ],
    },
  },
};

export default item;
