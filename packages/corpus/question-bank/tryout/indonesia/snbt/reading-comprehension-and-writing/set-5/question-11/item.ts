import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "quake-drill",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Gempa Bumi di Indonesia",
        },
        {
          correct: false,
          label: "Jalur Keluar Bertanda Panah Hijau",
        },
        {
          correct: false,
          label: "Petugas Menghitung Siswa di Lapangan",
        },
        {
          correct: false,
          label: "Tangga Sekolah yang Macet",
        },
        {
          correct: true,
          label: "Latihan Gempa yang Berulang Membuat Siswa Lebih Siap",
        },
      ],
    },
  },
};

export default item;
