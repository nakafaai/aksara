import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "lontar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kuat",
        },
        {
          correct: false,
          label: "lapuk",
        },
        {
          correct: false,
          label: "tipis",
        },
        {
          correct: false,
          label: "usang",
        },
        {
          correct: false,
          label: "kering",
        },
      ],
    },
  },
};

export default item;
