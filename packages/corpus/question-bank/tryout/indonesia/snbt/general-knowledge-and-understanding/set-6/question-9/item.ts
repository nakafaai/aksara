import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "abu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "membakar",
        },
        {
          correct: false,
          label: "melumasi",
        },
        {
          correct: false,
          label: "mendinginkan",
        },
        {
          correct: false,
          label: "melubangi",
        },
        {
          correct: true,
          label: "menutup",
        },
      ],
    },
  },
};

export default item;
