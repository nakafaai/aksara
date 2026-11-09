import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "screen-printing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "karena",
        },
        {
          correct: true,
          label: "meskipun",
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
          label: "lalu",
        },
      ],
    },
  },
};

export default item;
