import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "stingless-bees",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menindih",
        },
        {
          correct: true,
          label: "mengurangi",
        },
        {
          correct: false,
          label: "memaksa",
        },
        {
          correct: false,
          label: "menaikkan",
        },
        {
          correct: false,
          label: "mendesak",
        },
      ],
    },
  },
};

export default item;
