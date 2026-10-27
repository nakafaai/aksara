import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "BBS",
        },
        {
          correct: true,
          label: "BSB",
        },
        {
          correct: false,
          label: "BSS",
        },
        {
          correct: false,
          label: "SBB",
        },
        {
          correct: false,
          label: "SBS",
        },
      ],
    },
  },
};

export default item;
