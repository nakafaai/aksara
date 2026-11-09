import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebagian siswa kelas VII sudah berusia paling sedikit 12 tahun.",
        },
        {
          correct: false,
          label: "Semua siswa kelas VII pernah mengikuti turnamen catur.",
        },
        {
          correct: false,
          label: "Sebagian anggota klub catur belum pernah mengikuti turnamen.",
        },
        {
          correct: false,
          label:
            "Semua orang yang berusia paling sedikit 12 tahun adalah anggota klub catur.",
        },
        {
          correct: false,
          label:
            "Tidak ada siswa kelas VII yang pernah mengikuti turnamen catur.",
        },
      ],
    },
  },
};

export default item;
