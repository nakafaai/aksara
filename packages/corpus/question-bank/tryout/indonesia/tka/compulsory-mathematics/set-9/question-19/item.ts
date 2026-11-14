import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1:2$$",
        },
        {
          correct: false,
          label: "$$1:1$$",
        },
        {
          correct: false,
          label: "$$1:3$$",
        },
        {
          correct: false,
          label: "$$2:1$$",
        },
        {
          correct: false,
          label: "$$2:3$$",
        },
      ],
    },
  },
};

export default item;
