import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-vaccination",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "36 siswa" },
        { correct: false, label: "57 siswa" },
        { correct: false, label: "60 siswa" },
        { correct: false, label: "116 siswa" },
        { correct: false, label: "156 siswa" },
      ],
    },
  },
};

export default item;
