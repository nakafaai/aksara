import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pukul 12.00",
        },
        {
          correct: false,
          label: "pukul 12.12",
        },
        {
          correct: true,
          label: "pukul 13.00",
        },
        {
          correct: false,
          label: "pukul 17.00",
        },
        {
          correct: false,
          label: "pukul 23.00",
        },
      ],
    },
  },
};

export default item;
