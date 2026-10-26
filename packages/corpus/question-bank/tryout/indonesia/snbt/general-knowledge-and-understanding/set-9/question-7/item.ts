import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pesan norma deskriptif dapat mengubah perilaku, tetapi efeknya harus dipisahkan dari faktor lain dan klaimnya harus akurat.",
        },
        {
          correct: false,
          label:
            "Pengelola dapat memasang lebih banyak larangan tanpa mengubah pesan atau cara pengukuran.",
        },
        {
          correct: true,
          label:
            "Bus dengan pesan baru pada uji awal juga lebih sering didampingi relawan dan memiliki pengemudi yang mendapat pengarahan tambahan.",
        },
        {
          correct: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
        {
          correct: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
      ],
    },
  },
};

export default item;
