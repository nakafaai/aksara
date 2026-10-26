import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\%$$",
        },
        {
          correct: true,
          label: "$$10\\%$$",
        },
        {
          correct: false,
          label: "$$8\\%$$",
        },
        {
          correct: false,
          label: "$$12\\%$$",
        },
        {
          correct: false,
          label: "$$15\\%$$",
        },
      ],
    },
  },
};

export default item;
