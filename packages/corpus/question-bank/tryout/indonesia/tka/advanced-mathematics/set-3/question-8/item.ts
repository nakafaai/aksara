import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\{x\\mid x\\ge1\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\ne3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\le-2\\text{ atau }x>3\\}$$",
        },
        {
          correct: true,
          label: "$$\\{x\\mid x>3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid -2\\le x<3\\}$$",
        },
      ],
    },
  },
};

export default item;
