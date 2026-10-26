import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ardian pasti mengikuti kedua ujian.",
        },
        {
          correct: true,
          label:
            "Ardian pasti mengikuti Ujian Sekolah, tetapi keikutsertaannya dalam tes masuk bisa benar atau salah.",
        },
        {
          correct: false,
          label: "Ardian pasti tidak mengikuti kedua ujian.",
        },
        {
          correct: false,
          label:
            "Ardian pasti mengikuti tes masuk, tetapi keikutsertaannya dalam Ujian Sekolah belum diketahui.",
        },
        {
          correct: false,
          label: "Simpulan tidak berkaitan dengan informasi tentang Ardian.",
        },
      ],
    },
  },
};

export default item;
