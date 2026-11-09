import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-18$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
        {
          correct: false,
          label: "$$-54$$",
        },
        {
          correct: true,
          label: "$$54$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
      ],
    },
  },
};

export default item;
