import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\{x\\mid x\\le-5\\}$$" },
        { correct: false, label: "$$\\{x\\mid -5<x<-1\\}$$" },
        { correct: false, label: "$$\\{x\\mid -5\\le x\\le-1\\}$$" },
        {
          correct: false,
          label: "$$\\{x\\mid x\\le-5\\ \\text{atau}\\ x>-1\\}$$",
        },
        { correct: true, label: "$$\\{x\\mid -5\\le x<-1\\}$$" },
      ],
    },
  },
};

export default item;
