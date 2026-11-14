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
          label: "$$\\left(60-10\\sqrt{3}\\right)\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(60\\sqrt{3}-60\\right)\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$30\\sqrt{3}\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$50\\sqrt{3}\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$60\\sqrt{3}\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
