import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "mikroplastik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "alami",
        },
        {
          correct: false,
          label: "tipis",
        },
        {
          correct: false,
          label: "lembut",
        },
        {
          correct: false,
          label: "bekas",
        },
        {
          correct: true,
          label: "buatan",
        },
      ],
    },
  },
};

export default item;
