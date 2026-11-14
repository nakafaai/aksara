import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\{x\\mid 2<x<3\\}$$",
        },
        {
          correct: true,
          label: "$$\\{x\\mid x<2\\text{ atau }x>3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\le2\\text{ atau }x\\ge3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x>3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\in\\mathbb{R}\\}$$",
        },
      ],
    },
  },
};

export default item;
