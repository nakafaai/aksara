import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "alternative-explanation",
  },
  stimulus: "belajar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kelas yang jam belajar mandirinya banyak juga memiliki banyak siswa yang ikut bimbingan belajar.",
        },
        {
          correct: false,
          label:
            "Kelas XII-4 memiliki jam belajar mandiri yang lebih sedikit daripada kelas XII-2.",
        },
        {
          correct: false,
          label:
            "Nilai rata-rata ujian kelas XII-1 adalah yang paling rendah di antara kelima kelas yang dibandingkan.",
        },
        {
          correct: false,
          label:
            "Nilai rata-rata ujian pada tabel ditulis sebagai bilangan bulat tanpa angka desimal.",
        },
        {
          correct: false,
          label:
            "Jam belajar mandiri dicatat dalam satuan jam per minggu, bukan per hari.",
        },
      ],
    },
  },
};

export default item;
