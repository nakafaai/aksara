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
          label: "$$5$$ putaran",
        },
        {
          correct: false,
          label: "$$25$$ putaran",
        },
        {
          correct: true,
          label: "$$50$$ putaran",
        },
        {
          correct: false,
          label: "$$100$$ putaran",
        },
        {
          correct: false,
          label: "$$500$$ putaran",
        },
      ],
    },
  },
};

export default item;
