import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "tournament",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A bermain seri melawan C.",
        },
        {
          correct: false,
          label: "B mengalahkan D.",
        },
        {
          correct: false,
          label: "D bermain seri melawan A.",
        },
        {
          correct: true,
          label: "C mengalahkan D.",
        },
        {
          correct: false,
          label: "A kalah dari B.",
        },
      ],
    },
  },
};

export default item;
