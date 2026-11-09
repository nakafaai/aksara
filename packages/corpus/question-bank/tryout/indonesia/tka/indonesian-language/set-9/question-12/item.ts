import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "silat-club",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "penjelasan itu dibuat agar lebih sedikit siswa mendaftar",
        },
        {
          correct: false,
          label: "siswa keluar karena Pak Rahmat melarang pertandingan",
        },
        {
          correct: false,
          label: "penjelasan itu tidak berhubungan dengan siswa yang keluar",
        },
        {
          correct: true,
          label:
            "penjelasan itu bertujuan meluruskan anggapan bahwa pencak silat hanya tentang bertanding",
        },
        {
          correct: false,
          label: "siswa keluar karena latihan dipindah ke hari Kamis",
        },
      ],
    },
  },
};

export default item;
