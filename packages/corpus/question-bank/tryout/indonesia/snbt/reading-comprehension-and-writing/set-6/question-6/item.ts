import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "larva-compost",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pasar Sentul mengurangi sampah yang dibuang dengan memanfaatkan larva lalat tentara hitam.",
        },
        {
          correct: false,
          label:
            "Biaya mengangkut sampah ke tempat pembuangan akhir tidak sedikit.",
        },
        {
          correct: false,
          label: "Larva yang sudah besar dijual kepada peternak sebagai pakan.",
        },
        {
          correct: false,
          label: "Pupuk dari sisa sampah dibeli oleh petani sayur.",
        },
        {
          correct: false,
          label:
            "Pasar Sentul menghasilkan hampir satu ton sampah setiap hari.",
        },
      ],
    },
  },
};

export default item;
