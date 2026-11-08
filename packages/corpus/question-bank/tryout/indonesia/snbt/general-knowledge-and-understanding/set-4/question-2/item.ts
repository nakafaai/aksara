import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "awan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "garam",
        },
        {
          correct: true,
          label: "benih",
        },
        {
          correct: false,
          label: "pupuk",
        },
        {
          correct: false,
          label: "debu",
        },
        {
          correct: false,
          label: "obat",
        },
      ],
    },
  },
};

export default item;
