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
          correct: false,
          label: "$$10\\sqrt3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$30(\\sqrt3-1)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\sqrt3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30(\\sqrt3+1)\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
