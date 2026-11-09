import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "office-elevator",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "3 kali" },
        { correct: false, label: "4 kali" },
        { correct: true, label: "5 kali" },
        { correct: false, label: "6 kali" },
        { correct: false, label: "7 kali" },
      ],
    },
  },
};

export default item;
