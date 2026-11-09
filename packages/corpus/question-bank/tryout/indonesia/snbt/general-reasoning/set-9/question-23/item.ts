import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "konser",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Festival, Tribun, VIP",
        },
        {
          correct: false,
          label: "VIP, Festival, Tribun",
        },
        {
          correct: false,
          label: "Tribun, VIP, Festival",
        },
        {
          correct: true,
          label: "Tribun, Festival, VIP",
        },
        {
          correct: false,
          label: "Festival, VIP, Tribun",
        },
      ],
    },
  },
};

export default item;
