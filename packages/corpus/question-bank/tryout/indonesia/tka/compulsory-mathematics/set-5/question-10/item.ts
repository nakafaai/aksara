import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{4}{3}\\sqrt{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$4\\sqrt{3}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
