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
          label: "$$8\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\frac{16}{3}\\sqrt{3}\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$16\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$24\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$16\\sqrt{3}\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
