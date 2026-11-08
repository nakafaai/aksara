import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "sleep-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua siswa yang tidur kurang dari enam jam bermain gawai hingga larut malam.",
        },
        {
          correct: false,
          label:
            "OSIS SMA Bakti sudah mengadakan kampanye tidur cukup pada bulan Maret.",
        },
        {
          correct: false,
          label:
            "Siswa yang tidur enam sampai tujuh jam sudah memenuhi anjuran para ahli kesehatan.",
        },
        {
          correct: true,
          label:
            "Sebagian besar siswa yang disurvei tidur lebih sedikit daripada waktu yang dianjurkan.",
        },
        {
          correct: false,
          label: "Survei itu diikuti oleh siswa dari semua kelas di SMA Bakti.",
        },
      ],
    },
  },
};

export default item;
