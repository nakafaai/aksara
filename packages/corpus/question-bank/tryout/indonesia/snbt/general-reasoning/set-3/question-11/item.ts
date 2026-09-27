import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ardian pasti mengikuti kedua ujian.",
        },
        {
          isCorrect: true,
          label:
            "Ardian pasti mengikuti Ujian Sekolah, tetapi keikutsertaannya dalam tes masuk bisa benar atau salah.",
        },
        {
          isCorrect: false,
          label: "Ardian pasti tidak mengikuti kedua ujian.",
        },
        {
          isCorrect: false,
          label:
            "Ardian pasti mengikuti tes masuk, tetapi keikutsertaannya dalam Ujian Sekolah belum diketahui.",
        },
        {
          isCorrect: false,
          label: "Simpulan tidak berkaitan dengan informasi tentang Ardian.",
        },
      ],
    },
  },
};

export default item;
