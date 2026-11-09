import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "class-ranking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai rapor sama sekali tidak mencerminkan penguasaan materi.",
        },
        {
          correct: true,
          label:
            "Kemampuan rata-rata siswa dapat berbeda dari satu kelas ke kelas lain.",
        },
        {
          correct: false,
          label:
            "Orang tua tidak pernah membaca nilai setiap mata pelajaran di rapor.",
        },
        {
          correct: false,
          label: "Setiap kelas memiliki jumlah siswa yang sama.",
        },
        {
          correct: false,
          label:
            "Guru di kelas yang kuat memberikan nilai lebih rendah daripada guru di kelas lain.",
        },
      ],
    },
  },
};

export default item;
