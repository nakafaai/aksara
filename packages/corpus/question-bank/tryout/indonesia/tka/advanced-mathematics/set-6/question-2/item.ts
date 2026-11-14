import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(3,1)$$",
        },
        {
          correct: true,
          label: "$$(-3,-1)$$",
        },
        {
          correct: false,
          label: "$$(-1,3)$$",
        },
        {
          correct: false,
          label: "$$(1,-3)$$",
        },
        {
          correct: false,
          label: "$$(-3,1)$$",
        },
      ],
    },
  },
};

export default item;
