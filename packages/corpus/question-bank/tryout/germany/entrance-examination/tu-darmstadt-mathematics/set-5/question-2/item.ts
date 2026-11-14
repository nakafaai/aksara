import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3\\le x\\le7$$",
        },
        {
          correct: false,
          label: "$$3<x<7$$",
        },
        {
          correct: false,
          label: "$$0<x\\le3$$ oder $$7\\le x<10$$",
        },
        {
          correct: false,
          label: "$$3\\le x<10$$",
        },
        {
          correct: false,
          label: "$$-7\\le x\\le-3$$",
        },
        {
          correct: false,
          label: "$$0<x\\le7$$",
        },
      ],
    },
  },
};

export default item;
