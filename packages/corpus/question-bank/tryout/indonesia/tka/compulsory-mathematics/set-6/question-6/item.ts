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
          label: "$$\\{y\\mid-3\\le y\\le6\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid-2\\le y\\le6\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid y\\ge-3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid-3\\le y\\le-2\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid-1\\le y\\le3\\}$$",
        },
      ],
    },
  },
};

export default item;
