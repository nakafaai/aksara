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
          label: "$$12\\sqrt{5}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$20\\sqrt{2}\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\sqrt{2}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\sqrt{3}\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
