import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  stimulus: "playground",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}8\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3{,}2\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$4\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$5{,}6\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
