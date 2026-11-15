import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "regression-mean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "memberi kelas tambahan kepada semua siswa bernilai terendah, lalu membandingkan kenaikan mereka dengan kenaikan siswa bernilai tertinggi",
        },
        {
          correct: false,
          label:
            "membagi siswa bernilai terendah secara acak, tetapi dalam kelompok kelas tambahan hanya menghitung siswa yang rajin datang",
        },
        {
          correct: true,
          label:
            "membagi siswa bernilai terendah secara acak ke kelompok yang ikut dan tidak ikut kelas tambahan, lalu membandingkan kenaikan kedua kelompok, karena regresi ke rata-rata mengenai keduanya sama besar",
        },
        {
          correct: false,
          label:
            "memakai siswa bernilai terendah yang jadwalnya bentrok sebagai pembanding, lalu menambah jumlah mereka agar perbandingannya lebih meyakinkan",
        },
        {
          correct: false,
          label:
            "membagi siswa bernilai terendah secara acak, lalu membandingkan kenaikan kelompok kelas tambahan dengan angka $$10$$ poin dari tahun ini",
        },
      ],
    },
  },
};

export default item;
