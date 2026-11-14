import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$37$$ m",
        },
        {
          correct: false,
          label: "$$39{,}5$$ m",
        },
        {
          correct: false,
          label: "$$41{,}5$$ m",
        },
        {
          correct: true,
          label: "$$43$$ m",
        },
        {
          correct: false,
          label: "$$45$$ m",
        },
      ],
    },
  },
};

export default item;
