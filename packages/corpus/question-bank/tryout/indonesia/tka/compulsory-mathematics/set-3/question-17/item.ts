import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "tangga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$27$$ sak",
        },
        {
          correct: false,
          label: "$$30$$ sak",
        },
        {
          correct: false,
          label: "$$38$$ sak",
        },
        {
          correct: false,
          label: "$$41$$ sak",
        },
        {
          correct: true,
          label: "$$42$$ sak",
        },
      ],
    },
  },
};

export default item;
