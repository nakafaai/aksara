import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "sleep-memory",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Agar kedua kelompok mempelajari daftar pasangan kata dengan jumlah yang sama.",
        },
        {
          correct: false,
          label:
            "Karena tidur siang menghasilkan lebih banyak tidur gelombang lambat daripada tidur malam.",
        },
        {
          correct: false,
          label:
            "Agar peserta tidak mengetahui kelompok mana yang diharapkan mengingat lebih banyak.",
        },
        {
          correct: true,
          label:
            "Untuk menyingkirkan kemungkinan bahwa perbedaan skor disebabkan oleh kondisi peserta pada jam tes, bukan oleh tidur.",
        },
        {
          correct: false,
          label:
            "Untuk membuktikan bahwa kelelahan pada malam hari tidak memengaruhi kemampuan mengingat.",
        },
      ],
    },
  },
};

export default item;
