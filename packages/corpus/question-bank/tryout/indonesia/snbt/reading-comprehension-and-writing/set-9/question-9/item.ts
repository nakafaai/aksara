import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "food-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sehingga",
        },
        {
          correct: false,
          label: "meskipun",
        },
        {
          correct: true,
          label: "karena",
        },
        {
          correct: false,
          label: "agar",
        },
        {
          correct: false,
          label: "lalu",
        },
      ],
    },
  },
};

export default item;
