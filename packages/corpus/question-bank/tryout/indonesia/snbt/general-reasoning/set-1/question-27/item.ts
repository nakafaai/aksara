import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "calendar",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18$$",
        },
        {
          correct: true,
          label: "$$19$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$23$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
      ],
    },
  },
};

export default item;
