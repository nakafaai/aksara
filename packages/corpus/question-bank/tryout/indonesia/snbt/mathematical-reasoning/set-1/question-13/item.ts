import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$4{,}5$$",
        },
        {
          correct: true,
          label: "$$3{,}5$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$5{,}5$$",
        },
      ],
    },
  },
};

export default item;
