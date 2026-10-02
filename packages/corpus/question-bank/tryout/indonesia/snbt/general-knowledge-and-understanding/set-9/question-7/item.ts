import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pesan norma deskriptif dapat mengubah perilaku, tetapi efeknya harus dipisahkan dari faktor lain dan klaimnya harus akurat.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola dapat memasang lebih banyak larangan tanpa mengubah pesan atau cara pengukuran.",
        },
        {
          isCorrect: true,
          label:
            "Bus dengan pesan baru pada uji awal juga lebih sering didampingi relawan dan memiliki pengemudi yang mendapat pengarahan tambahan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
