import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "knockout-cup",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "4 jam 30 menit" },
        { correct: false, label: "6 jam 45 menit" },
        { correct: false, label: "7 jam 30 menit" },
        { correct: true, label: "8 jam 15 menit" },
        { correct: false, label: "29 jam 15 menit" },
      ],
    },
  },
};

export default item;
