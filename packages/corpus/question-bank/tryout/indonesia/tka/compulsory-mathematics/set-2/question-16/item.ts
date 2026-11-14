import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "kaca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$ kipas",
        },
        {
          correct: false,
          label: "$$6$$ kipas",
        },
        {
          correct: false,
          label: "$$8$$ kipas",
        },
        {
          correct: false,
          label: "$$9$$ kipas",
        },
        {
          correct: true,
          label: "$$10$$ kipas",
        },
      ],
    },
  },
};

export default item;
