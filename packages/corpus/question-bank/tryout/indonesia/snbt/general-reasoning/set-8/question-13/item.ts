import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Banyak siswa menyatakan bahwa pengingat membantu mereka mengingat tenggat.",
        },
        {
          isCorrect: false,
          label:
            "Kelas pembanding tanpa aplikasi tidak mengalami peningkatan pengumpulan tepat waktu.",
        },
        {
          isCorrect: false,
          label:
            "Sekolah menggunakan definisi “tepat waktu” yang sama pada kedua periode.",
        },
        {
          isCorrect: true,
          label:
            "Pada minggu yang sama, tenggat pengumpulan diperpanjang dari pukul $$17.00$$ hingga tengah malam.",
        },
        {
          isCorrect: false,
          label: "Aplikasi mengirim pengingat sehari sebelum setiap tenggat.",
        },
      ],
    },
  },
};

export default item;
