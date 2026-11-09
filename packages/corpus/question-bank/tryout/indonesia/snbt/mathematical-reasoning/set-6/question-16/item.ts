import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "calendar-2027",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "10 Maret 2027" },
        { correct: false, label: "11 Maret 2027" },
        { correct: true, label: "12 Maret 2027" },
        { correct: false, label: "13 Maret 2027" },
        { correct: false, label: "19 Maret 2027" },
      ],
    },
  },
};

export default item;
