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
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: true,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
      ],
    },
  },
};

export default item;
