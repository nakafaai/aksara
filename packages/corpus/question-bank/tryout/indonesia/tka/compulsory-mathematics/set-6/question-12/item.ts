import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
        {
          correct: false,
          label: "$$21$$",
        },
      ],
    },
  },
};

export default item;
