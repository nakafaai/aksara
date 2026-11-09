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
          correct: true,
          label: "$$\\{x\\mid -2\\le x\\le2,\\ x\\ne1\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid -2\\le x\\le2\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\ne1\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid -2<x<2,\\ x\\ne1\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\le-2\\text{ atau }x\\ge2\\}$$",
        },
      ],
    },
  },
};

export default item;
