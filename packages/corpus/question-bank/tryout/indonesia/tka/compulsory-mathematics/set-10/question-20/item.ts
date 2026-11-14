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
          label: "$$42\\sqrt{3}\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$48\\sqrt{3}\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$(108+18\\sqrt{3})\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$96\\sqrt{3}\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$162\\sqrt{3}\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
