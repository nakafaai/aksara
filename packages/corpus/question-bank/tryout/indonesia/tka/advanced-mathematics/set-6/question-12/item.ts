import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{77}$$",
        },
        {
          correct: true,
          label: "$$\\sqrt{65}$$",
        },
        {
          correct: false,
          label: "$$\\frac12\\sqrt{65}$$",
        },
      ],
    },
  },
};

export default item;
