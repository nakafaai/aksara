import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "time-zones",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "6 jam 10 menit" },
        { correct: false, label: "6 jam 35 menit" },
        { correct: false, label: "7 jam 5 menit" },
        { correct: true, label: "7 jam 35 menit" },
        { correct: false, label: "9 jam 35 menit" },
      ],
    },
  },
};

export default item;
