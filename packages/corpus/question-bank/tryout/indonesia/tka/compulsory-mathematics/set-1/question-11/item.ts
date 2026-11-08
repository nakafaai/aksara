import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  stimulus: "playground",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$2\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
