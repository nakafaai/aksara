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
          label: "$$4\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: true,
          label: "$$5\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{21}$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
      ],
    },
  },
};

export default item;
