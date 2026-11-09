import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "running-club",
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
          label: "$$3$$ menit",
        },
        {
          correct: true,
          label: "$$5$$ menit",
        },
        {
          correct: false,
          label: "$$6$$ menit",
        },
      ],
    },
  },
};

export default item;
