import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "truth-teller",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rafi",
        },
        {
          correct: false,
          label: "Sela",
        },
        {
          correct: true,
          label: "Tomi",
        },
        {
          correct: false,
          label: "Umar",
        },
        {
          correct: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
