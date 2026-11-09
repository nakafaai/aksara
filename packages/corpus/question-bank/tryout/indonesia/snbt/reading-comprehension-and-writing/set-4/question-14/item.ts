import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "rain-gauge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Biaya membersihkan saluran setiap minggu lebih mahal daripada biaya memperbesar saluran.",
        },
        {
          correct: false,
          label:
            "Lapangan sekolah lain di Lembang juga sering tergenang pada musim hujan.",
        },
        {
          correct: false,
          label:
            "Siswa kelompok ilmiah remaja juga mencatat suhu udara setiap pagi.",
        },
        {
          correct: true,
          label:
            "Selama tiga minggu saluran dibersihkan rutin, lapangan tidak pernah tergenang walaupun hujan deras turun.",
        },
        {
          correct: false,
          label: "Sebagian guru lebih suka upacara diadakan di dalam aula.",
        },
      ],
    },
  },
};

export default item;
