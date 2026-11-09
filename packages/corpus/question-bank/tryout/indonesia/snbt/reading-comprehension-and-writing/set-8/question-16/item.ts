import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "minibus-schedule",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$ menit",
        },
        {
          correct: false,
          label: "$$2$$ menit",
        },
        {
          correct: false,
          label: "$$12$$ menit",
        },
        {
          correct: false,
          label: "$$13$$ menit",
        },
        {
          correct: true,
          label: "$$14$$ menit",
        },
      ],
    },
  },
};

export default item;
