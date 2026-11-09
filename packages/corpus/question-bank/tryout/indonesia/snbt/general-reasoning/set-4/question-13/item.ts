import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "logical-equivalence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua peserta yang tidak terlambat diizinkan masuk ruang ujian.",
        },
        {
          correct: false,
          label: "Ada peserta terlambat yang diizinkan masuk ruang ujian.",
        },
        {
          correct: false,
          label:
            "Sebagian peserta yang terlambat tidak diizinkan masuk ruang ujian.",
        },
        {
          correct: true,
          label:
            "Semua peserta yang diizinkan masuk ruang ujian tidak terlambat.",
        },
        {
          correct: false,
          label:
            "Setiap peserta yang tidak diizinkan masuk ruang ujian pasti terlambat.",
        },
      ],
    },
  },
};

export default item;
