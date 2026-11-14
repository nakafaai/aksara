import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: true,
          label: "$$45$$",
        },
        {
          correct: false,
          label: "$$90$$",
        },
      ],
    },
  },
};

export default item;
