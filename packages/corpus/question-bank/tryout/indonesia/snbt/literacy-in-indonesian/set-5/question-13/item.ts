import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "radio-repair",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Barang lama sebaiknya segera diganti dengan barang yang memakai teknologi baru.",
        },
        {
          correct: false,
          label:
            "Anak muda sebaiknya selalu menuruti nasihat orang tuanya tentang barang lama.",
        },
        {
          correct: false,
          label:
            "Pekerjaan yang dikerjakan dengan sabar pasti dibayar dengan harga yang mahal.",
        },
        {
          correct: false,
          label:
            "Kejujuran merugikan pedagang kecil yang sedang kehilangan pelanggan.",
        },
        {
          correct: true,
          label:
            "Masa lalu tidak bisa diputar ulang, tetapi sisa-sisanya masih dapat dirawat.",
        },
      ],
    },
  },
};

export default item;
