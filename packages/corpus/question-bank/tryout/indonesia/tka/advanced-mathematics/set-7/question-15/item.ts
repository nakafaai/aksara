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
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
      ],
    },
  },
};

export default item;
