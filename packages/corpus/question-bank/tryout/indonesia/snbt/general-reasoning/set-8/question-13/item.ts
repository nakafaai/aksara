import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Banyak siswa menyatakan bahwa pengingat membantu mereka mengingat tenggat.",
        },
        {
          correct: false,
          label:
            "Kelas pembanding tanpa aplikasi tidak mengalami peningkatan pengumpulan tepat waktu.",
        },
        {
          correct: false,
          label:
            "Sekolah menggunakan definisi “tepat waktu” yang sama pada kedua periode.",
        },
        {
          correct: true,
          label:
            "Pada minggu yang sama, tenggat pengumpulan diperpanjang dari pukul $$17.00$$ hingga tengah malam.",
        },
        {
          correct: false,
          label: "Aplikasi mengirim pengingat sehari sebelum setiap tenggat.",
        },
      ],
    },
  },
};

export default item;
