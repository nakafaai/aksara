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
          correct: true,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{13}{2}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{13}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\sqrt{2}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt{13}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
