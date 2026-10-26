import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Anak bermain di luar ruangan.",
        },
        {
          correct: false,
          label: "Anak memiliki lebih banyak kesempatan.",
        },
        {
          correct: false,
          label: "Musim panas bermain di luar ruangan.",
        },
        {
          correct: false,
          label: "Kesempatan terjadi di luar ruangan.",
        },
        {
          correct: true,
          label: "Musim panas memberi anak kesempatan.",
        },
      ],
    },
  },
};

export default item;
