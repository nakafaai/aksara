import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "home-internet",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "6,25 Mbps" },
        { correct: true, label: "50 Mbps" },
        { correct: false, label: "62,5 Mbps" },
        { correct: false, label: "100 Mbps" },
        { correct: false, label: "375 Mbps" },
      ],
    },
  },
};

export default item;
