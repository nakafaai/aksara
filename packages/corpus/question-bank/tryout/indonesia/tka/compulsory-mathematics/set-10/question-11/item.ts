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
          correct: true,
          label: "$$30$$ km",
        },
        {
          correct: false,
          label: "$$42$$ km",
        },
        {
          correct: false,
          label: "$$216$$ km",
        },
        {
          correct: false,
          label: "$$432$$ km",
        },
        {
          correct: false,
          label: "$$900$$ km",
        },
      ],
    },
  },
};

export default item;
