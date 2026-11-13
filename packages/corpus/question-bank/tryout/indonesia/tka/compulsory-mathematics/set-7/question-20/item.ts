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
          label: "$$\\left(\\sqrt{6}-\\sqrt{3}+\\sqrt{2}-2\\right)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(\\sqrt{3}-\\sqrt{2}\\right)\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$\\left(\\sqrt{6}+\\sqrt{3}-\\sqrt{2}-2\\right)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(\\sqrt{6}-\\sqrt{3}-\\sqrt{2}+2\\right)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\left(2\\sqrt{2}+2\\right)\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
