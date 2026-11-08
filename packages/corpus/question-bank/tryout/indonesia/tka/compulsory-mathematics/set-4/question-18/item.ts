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
          label: "$$5$$ lilitan",
        },
        {
          correct: false,
          label: "$$25$$ lilitan",
        },
        {
          correct: true,
          label: "$$50$$ lilitan",
        },
        {
          correct: false,
          label: "$$100$$ lilitan",
        },
        {
          correct: false,
          label: "$$500$$ lilitan",
        },
      ],
    },
  },
};

export default item;
