import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "train-departures",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "5 kali" },
        { correct: false, label: "6 kali" },
        { correct: false, label: "9 kali" },
        { correct: false, label: "13 kali" },
        { correct: false, label: "22 kali" },
      ],
    },
  },
};

export default item;
