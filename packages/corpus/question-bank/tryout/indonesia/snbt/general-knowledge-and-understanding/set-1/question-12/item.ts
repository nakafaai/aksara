import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "serapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menggoreskan",
        },
        {
          correct: true,
          label: "menetapkan",
        },
        {
          correct: false,
          label: "menggarisbawahi",
        },
        {
          correct: false,
          label: "mencoret",
        },
        {
          correct: false,
          label: "merintis",
        },
      ],
    },
  },
};

export default item;
