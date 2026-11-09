import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$10\\sqrt3$$ km",
        },
        {
          correct: false,
          label: "$$10$$ km",
        },
        {
          correct: false,
          label: "$$10\\sqrt2$$ km",
        },
        {
          correct: false,
          label: "$$20\\sqrt3$$ km",
        },
        {
          correct: false,
          label: "$$\\frac{40\\sqrt3}{3}$$ km",
        },
      ],
    },
  },
};

export default item;
