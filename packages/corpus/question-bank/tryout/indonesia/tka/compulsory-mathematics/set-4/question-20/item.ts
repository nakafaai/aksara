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
          label: "$$30\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$31{,}2\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$40\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$41{,}2\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$51{,}2\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
