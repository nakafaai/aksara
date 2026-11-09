import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "infiltration-well",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "karena",
        },
        {
          correct: false,
          label: "meskipun",
        },
        {
          correct: true,
          label: "agar",
        },
        {
          correct: false,
          label: "bahkan",
        },
        {
          correct: false,
          label: "setelah",
        },
      ],
    },
  },
};

export default item;
