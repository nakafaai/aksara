import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tawaran pertama",
        },
        {
          correct: false,
          label: "Kedua tawaran sama besar",
        },
        {
          correct: false,
          label: "Tawaran pertama dua kali lebih besar",
        },
        { correct: true, label: "Tawaran kedua" },
        {
          correct: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
