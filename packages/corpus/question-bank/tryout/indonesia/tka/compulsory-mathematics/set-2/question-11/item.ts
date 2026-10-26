import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$112$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: false,
          label: "$$130$$",
        },
        {
          correct: false,
          label: "$$136$$",
        },
        {
          correct: true,
          label: "$$124$$",
        },
      ],
    },
  },
};

export default item;
