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
          correct: true,
          label: "$$(7,3)$$",
        },
        {
          correct: false,
          label: "$$(3,7)$$",
        },
        {
          correct: false,
          label: "$$(44,27)$$",
        },
        {
          correct: false,
          label: "$$(27,37)$$",
        },
        {
          correct: false,
          label: "$$(-7,-3)$$",
        },
      ],
    },
  },
};

export default item;
