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
          label: "$$4\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\left(6-\\sqrt{11}\\right)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\left(6-\\sqrt{6}\\right)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$2\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
