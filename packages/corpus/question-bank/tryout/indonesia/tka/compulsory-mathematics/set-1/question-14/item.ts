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
          label: "$$2\\sqrt{2}\\,\\pi\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$6\\sqrt{2}\\,\\pi\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$8\\sqrt{2}\\,\\pi\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\pi\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\sqrt{2}\\,\\pi\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
