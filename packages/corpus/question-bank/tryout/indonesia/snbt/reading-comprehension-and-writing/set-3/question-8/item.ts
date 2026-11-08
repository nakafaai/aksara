import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "stingless-bees",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "karena",
        },
        {
          correct: false,
          label: "sehingga",
        },
        {
          correct: false,
          label: "agar",
        },
        {
          correct: false,
          label: "meskipun",
        },
        {
          correct: false,
          label: "bahkan",
        },
      ],
    },
  },
};

export default item;
