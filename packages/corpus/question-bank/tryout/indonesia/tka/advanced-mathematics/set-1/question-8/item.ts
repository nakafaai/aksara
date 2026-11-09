import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(-\\infty,-4]$$",
        },
        {
          correct: false,
          label: "$$(-4,\\infty)$$",
        },
        {
          correct: false,
          label: "$$[-4,5)$$",
        },
        {
          correct: false,
          label: "$$[5,\\infty)$$",
        },
        {
          correct: true,
          label: "$$[-4,\\infty)$$",
        },
      ],
    },
  },
};

export default item;
