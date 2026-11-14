import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "tandon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pukul 06.17",
        },
        {
          correct: false,
          label: "pukul 06.21",
        },
        {
          correct: false,
          label: "pukul 06.28",
        },
        {
          correct: true,
          label: "pukul 06.31",
        },
        {
          correct: false,
          label: "pukul 06.45",
        },
      ],
    },
  },
};

export default item;
