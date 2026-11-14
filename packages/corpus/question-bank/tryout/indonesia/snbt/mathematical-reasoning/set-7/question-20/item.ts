import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-timetable",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Kamis pukul 09.00" },
        { correct: false, label: "Kamis pukul 09.45" },
        { correct: true, label: "Kamis pukul 10.00" },
        { correct: false, label: "Kamis pukul 10.15" },
        { correct: false, label: "Kamis pukul 10.30" },
      ],
    },
  },
};

export default item;
