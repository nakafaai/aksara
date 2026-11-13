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
          label: "$$4\\sqrt{2}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{5}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{6}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$8\\sqrt{2}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
