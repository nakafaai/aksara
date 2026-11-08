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
          label: "P berada di rak tengah.",
        },
        {
          correct: false,
          label: "Q berada di rak bawah.",
        },
        {
          correct: true,
          label: "K tidak berada di rak yang sama dengan M.",
        },
        {
          correct: false,
          label: "N berada di rak bawah.",
        },
        {
          correct: false,
          label: "M berada di rak atas.",
        },
      ],
    },
  },
};

export default item;
