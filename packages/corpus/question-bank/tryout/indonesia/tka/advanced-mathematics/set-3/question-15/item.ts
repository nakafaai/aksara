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
          label: "$$2\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{29}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{38}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt7$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
      ],
    },
  },
};

export default item;
