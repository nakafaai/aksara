import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$\\sqrt{41}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{73}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(3+4\\sqrt{2}\\right)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{137}\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
