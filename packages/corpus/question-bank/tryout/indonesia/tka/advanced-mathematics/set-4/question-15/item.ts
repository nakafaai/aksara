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
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: true,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$\\sqrt5$$",
        },
      ],
    },
  },
};

export default item;
