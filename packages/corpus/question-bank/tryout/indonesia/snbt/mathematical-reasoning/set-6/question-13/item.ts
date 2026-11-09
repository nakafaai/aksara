import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "calendar-2027",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Senin" },
        { correct: true, label: "Selasa" },
        { correct: false, label: "Rabu" },
        { correct: false, label: "Kamis" },
        { correct: false, label: "Jumat" },
      ],
    },
  },
};

export default item;
