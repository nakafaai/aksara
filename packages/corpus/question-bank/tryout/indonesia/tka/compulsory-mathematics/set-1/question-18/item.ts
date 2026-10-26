import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "park-and-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$124$$",
        },
        {
          correct: true,
          label: "$$127$$",
        },
        {
          correct: false,
          label: "$$126$$",
        },
        {
          correct: false,
          label: "$$128$$",
        },
        {
          correct: false,
          label: "$$130$$",
        },
      ],
    },
  },
};

export default item;
