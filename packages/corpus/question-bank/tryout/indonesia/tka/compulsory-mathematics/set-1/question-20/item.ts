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
          label: "$$2\\sqrt{3}\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$\\tfrac{5}{2}\\sqrt{3}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt{3}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{3}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\tfrac{9}{2}\\sqrt{3}\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
