import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "burung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kotak sarang adalah penyebab utama bertambahnya jenis burung di Taman Kenanga.",
        },
        {
          correct: false,
          label:
            "Banyak ekor burung di Taman Kenanga pada akhir 2025 hampir dua kali banyaknya pada awal 2024.",
        },
        {
          correct: false,
          label:
            "Taman Melati kehilangan jenis-jenis burung yang pindah ke Taman Kenanga.",
        },
        {
          correct: false,
          label:
            "Penanaman pohon buah lokal tidak berpengaruh terhadap banyak jenis burung di Taman Kenanga.",
        },
        {
          correct: true,
          label:
            "Bertambahnya jenis burung di Taman Kenanga sudah terjadi sebelum kotak sarang dipasang.",
        },
      ],
    },
  },
};

export default item;
