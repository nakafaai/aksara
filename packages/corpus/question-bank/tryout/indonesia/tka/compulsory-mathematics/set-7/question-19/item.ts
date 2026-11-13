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
          correct: false,
          label: "$$1:8$$",
        },
        {
          correct: true,
          label: "$$1:5$$",
        },
        {
          correct: false,
          label: "$$1:4$$",
        },
        {
          correct: false,
          label: "$$1:\\sqrt{5}$$",
        },
        {
          correct: false,
          label: "$$1:2$$",
        },
      ],
    },
  },
};

export default item;
