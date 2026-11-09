import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "number-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: true,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$21$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: false,
          label: "$$26$$",
        },
      ],
    },
  },
};

export default item;
