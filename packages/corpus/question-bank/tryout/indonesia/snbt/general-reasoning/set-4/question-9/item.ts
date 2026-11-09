import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "method-of-difference",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Nasi goreng",
        },
        {
          correct: true,
          label: "Es teh",
        },
        {
          correct: false,
          label: "Keripik",
        },
        {
          correct: false,
          label: "Mi ayam",
        },
        {
          correct: false,
          label: "Jus jeruk",
        },
      ],
    },
  },
};

export default item;
