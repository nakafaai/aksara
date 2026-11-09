import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
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
          label: "$$6$$",
        },
        {
          correct: true,
          label: "$$7$$",
        },
        {
          correct: false,
          label: "$$8$$",
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
