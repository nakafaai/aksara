import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "pipa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
