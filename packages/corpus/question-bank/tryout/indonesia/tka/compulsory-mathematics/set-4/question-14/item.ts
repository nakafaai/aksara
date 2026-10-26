import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\sqrt{145}\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$130\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(20\\sqrt{10}+30\\sqrt{5}\\right)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(20+30\\sqrt{17}\\right)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(30+20\\sqrt{37}\\right)\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
