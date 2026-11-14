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
          label: "$$6-3\\sqrt{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{2}$$",
        },
        {
          correct: false,
          label: "$$6-2\\sqrt{3}$$",
        },
        {
          correct: false,
          label: "$$9-3\\sqrt{3}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt{3}$$",
        },
      ],
    },
  },
};

export default item;
