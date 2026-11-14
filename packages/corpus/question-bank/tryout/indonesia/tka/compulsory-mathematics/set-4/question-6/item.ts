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
          label: "$$\\{y\\mid -3\\le y\\le 33\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid y\\ge -3\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid -2\\le y\\le 13\\}$$",
        },
        {
          correct: true,
          label: "$$\\{y\\mid -2\\le y\\le 33\\}$$",
        },
        {
          correct: false,
          label: "$$\\{y\\mid 6\\le y\\le 33\\}$$",
        },
      ],
    },
  },
};

export default item;
