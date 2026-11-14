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
          label: "$$36\\sqrt3\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$48\\sqrt3\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$72\\sqrt3\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$144\\sqrt3\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$216\\sqrt3\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
