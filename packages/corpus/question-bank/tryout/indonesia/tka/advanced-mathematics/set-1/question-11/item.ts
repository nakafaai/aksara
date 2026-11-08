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
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$5$$",
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
      ],
    },
  },
};

export default item;
