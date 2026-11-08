import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "swimming-pool",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3$$ jam $$20$$ menit",
        },
        {
          correct: true,
          label: "$$5$$ jam",
        },
        {
          correct: false,
          label: "$$8$$ jam $$20$$ menit",
        },
        {
          correct: false,
          label: "$$50$$ jam",
        },
        {
          correct: false,
          label: "$$300$$ jam",
        },
      ],
    },
  },
};

export default item;
