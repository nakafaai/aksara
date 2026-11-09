import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "kantor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karyawan yang merasa lebih nyaman bekerja cenderung lebih jarang datang terlambat ke kantor setiap pagi.",
        },
        {
          correct: false,
          label: "Tanaman hias yang dipakai mudah dirawat dan jarang layu.",
        },
        {
          correct: false,
          label: "Survei kenyamanan dilakukan secara daring.",
        },
        {
          correct: false,
          label: "Sebagian karyawan membawa tanaman sendiri ke rumah.",
        },
        {
          correct: true,
          label:
            "Di kantor cabang yang tidak diberi tanaman hias, jumlah izin sakit pada periode yang sama tidak berubah.",
        },
      ],
    },
  },
};

export default item;
