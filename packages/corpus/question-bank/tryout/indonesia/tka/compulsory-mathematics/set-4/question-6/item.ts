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
          label: "$$\\{x\\mid x\\le4,\\ x\\ne-1\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\le4\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x<4,\\ x\\ne-1\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\ge4\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x\\mid x\\ge-4,\\ x\\ne-1\\}$$",
        },
      ],
    },
  },
};

export default item;
