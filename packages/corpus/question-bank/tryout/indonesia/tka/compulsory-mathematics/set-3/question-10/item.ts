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
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$35\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$37\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
