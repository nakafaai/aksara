import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-3,0)$$",
        },
        {
          correct: false,
          label: "$$(1,0)$$",
        },
        {
          correct: false,
          label: "$$\\left(-\\frac52,0\\right)$$",
        },
        {
          correct: false,
          label: "$$(-2,0)$$",
        },
        {
          correct: true,
          label: "$$(-1,0)$$",
        },
      ],
    },
  },
};

export default item;
