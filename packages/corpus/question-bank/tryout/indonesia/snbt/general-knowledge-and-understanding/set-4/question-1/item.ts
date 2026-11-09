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
          correct: true,
          label: "menyebarkan",
        },
        {
          correct: false,
          label: "mengumpulkan",
        },
        {
          correct: false,
          label: "melarutkan",
        },
        {
          correct: false,
          label: "membakar",
        },
        {
          correct: false,
          label: "menimbun",
        },
      ],
    },
  },
};

export default item;
