import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "time-zones",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "2 jam 50 menit" },
        { correct: false, label: "3 jam 50 menit" },
        { correct: true, label: "4 jam 50 menit" },
        { correct: false, label: "5 jam 50 menit" },
        { correct: false, label: "6 jam 50 menit" },
      ],
    },
  },
};

export default item;
