import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "tourist-map",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "2,4 menit" },
        { correct: true, label: "24 menit" },
        { correct: false, label: "40 menit" },
        { correct: false, label: "2 jam 30 menit" },
        { correct: false, label: "4 jam" },
      ],
    },
  },
};

export default item;
