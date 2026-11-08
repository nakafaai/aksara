import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\{x\\mid x\\ge3\\}$$" },
        { correct: false, label: "$$\\{x\\mid 1<x<6\\}$$" },
        { correct: false, label: "$$\\{x\\mid x<1\\ \\text{atau}\\ x>6\\}$$" },
        {
          correct: false,
          label: "$$\\{x\\mid -3\\le x<1\\ \\text{atau}\\ x>6\\}$$",
        },
        { correct: true, label: "$$\\{x\\mid x>6\\}$$" },
      ],
    },
  },
};

export default item;
