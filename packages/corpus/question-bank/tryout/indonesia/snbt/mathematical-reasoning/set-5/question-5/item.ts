import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "track-laps",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Detik ke-$$400$$" },
        { correct: false, label: "Detik ke-$$450$$" },
        { correct: false, label: "Detik ke-$$600$$" },
        { correct: true, label: "Detik ke-$$650$$" },
        { correct: false, label: "Detik ke-$$700$$" },
      ],
    },
  },
};

export default item;
