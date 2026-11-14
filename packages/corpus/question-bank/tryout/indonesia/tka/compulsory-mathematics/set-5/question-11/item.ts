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
          label: "$$\\left(40+12\\sqrt{3}+10\\pi\\right)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\left(64+10\\pi\\right)\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$\\left(40+12\\sqrt{3}+12\\pi\\right)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\left(64+12\\pi\\right)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\left(40+12\\sqrt{3}+14\\pi\\right)\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
