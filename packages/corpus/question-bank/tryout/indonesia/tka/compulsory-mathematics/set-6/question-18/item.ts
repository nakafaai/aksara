import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$65\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$86\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$132\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$462\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
