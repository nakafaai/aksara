import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "home-internet",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "160 detik" },
        { correct: false, label: "180 detik" },
        { correct: true, label: "220 detik" },
        { correct: false, label: "240 detik" },
        { correct: false, label: "300 detik" },
      ],
    },
  },
};

export default item;
