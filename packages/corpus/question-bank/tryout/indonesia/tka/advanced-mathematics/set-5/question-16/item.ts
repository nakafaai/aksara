import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$40$$",
        },
        {
          correct: false,
          label: "$$\\frac{41}{2}$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt{41}$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
      ],
    },
  },
};

export default item;
