import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "conjunction",
  },
  stimulus: "weaving-class",
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
          label: "karena",
        },
        {
          correct: false,
          label: "bahkan",
        },
        {
          correct: true,
          label: "tetapi",
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
