import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "mebel",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Februari",
        },
        {
          correct: false,
          label: "Maret",
        },
        {
          correct: true,
          label: "April",
        },
        {
          correct: false,
          label: "Mei",
        },
        {
          correct: false,
          label: "Juni",
        },
      ],
    },
  },
};

export default item;
