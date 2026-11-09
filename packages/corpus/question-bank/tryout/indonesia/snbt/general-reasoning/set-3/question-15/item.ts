import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "rak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "M berada di rak tengah.",
        },
        {
          correct: false,
          label: "N berada di rak bawah.",
        },
        {
          correct: false,
          label: "P berada di rak tengah.",
        },
        {
          correct: false,
          label: "L berada di rak atas.",
        },
        {
          correct: true,
          label: "K berada di rak bawah.",
        },
      ],
    },
  },
};

export default item;
