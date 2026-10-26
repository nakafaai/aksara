import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3\\le x\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\}$$",
        },
        {
          correct: true,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x\\le7\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\in\\mathbb Z\\mid x\\le7\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\in\\mathbb Z\\mid-3<x<7\\}$$",
        },
      ],
    },
  },
};

export default item;
