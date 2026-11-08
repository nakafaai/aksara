import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "parallel-reasoning",
  },
  stimulus: "robotik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebuah pabrik membagi pekerjanya secara acak menjadi dua kelompok. Kelompok yang diberi waktu istirahat tambahan membuat lebih sedikit kesalahan, sehingga istirahat tambahan diberikan kepada semua pekerja.",
        },
        {
          correct: false,
          label:
            "Tiga dari lima toko roti yang dikunjungi Sinta menjual roti gandum, sehingga Sinta menyimpulkan sebagian besar toko roti di kotanya menjual roti gandum.",
        },
        {
          correct: false,
          label:
            "Karena seorang pelari terkenal memakai sepatu merek tertentu, sebuah iklan menyatakan bahwa sepatu itu membuat semua pemakainya berlari lebih cepat.",
        },
        {
          correct: false,
          label:
            "Semua peserta yang lulus seleksi sudah mengikuti pelatihan. Dodi lulus seleksi, jadi Dodi sudah mengikuti pelatihan.",
        },
        {
          correct: true,
          label:
            "Warga yang secara sukarela ikut kelas memasak sehat di puskesmas memiliki kadar gula darah lebih rendah daripada warga lain, sehingga kelurahan berencana mewajibkan kelas itu bagi semua warga.",
        },
      ],
    },
  },
};

export default item;
