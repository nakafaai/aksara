import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "burung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebagian besar jenis burung yang baru tercatat di Taman Kenanga pada 2024 adalah burung pemakan buah.",
        },
        {
          correct: false,
          label:
            "Taman Kenanga lebih luas daripada Taman Melati dan memiliki lebih banyak bangku.",
        },
        {
          correct: false,
          label:
            "Banyak pengunjung Taman Kenanga bertambah sejak pohon-pohon buah itu ditanam.",
        },
        {
          correct: false,
          label:
            "Kotak sarang di Taman Kenanga dipakai oleh dua jenis burung yang sudah tercatat di taman itu sejak sebelum 2024.",
        },
        {
          correct: false,
          label:
            "Pada 2025, banyak jenis burung di Taman Melati bertambah satu jenis dibandingkan tahun sebelumnya.",
        },
      ],
    },
  },
};

export default item;
