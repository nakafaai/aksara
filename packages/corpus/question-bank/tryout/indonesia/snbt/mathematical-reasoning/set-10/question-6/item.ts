import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "train-departures",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "6 kali" },
        { correct: false, label: "7 kali" },
        { correct: false, label: "12 kali" },
        { correct: false, label: "17 kali" },
        { correct: false, label: "18 kali" },
      ],
    },
  },
};

export default item;
