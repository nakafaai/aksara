import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "petir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menyusut",
        },
        {
          correct: false,
          label: "mendingin",
        },
        {
          correct: false,
          label: "menguap",
        },
        {
          correct: true,
          label: "mengembang",
        },
        {
          correct: false,
          label: "menghilang",
        },
      ],
    },
  },
};

export default item;
