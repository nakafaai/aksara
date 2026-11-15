import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3{,}6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3{,}15\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6{,}3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2{,}7\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$5{,}4\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$7{,}2\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
