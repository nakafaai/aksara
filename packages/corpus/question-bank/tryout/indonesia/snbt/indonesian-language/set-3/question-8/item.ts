import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mengulang model jaring-jaring makanan dengan lebih banyak unit, tetapi tetap memakai penyederhanaan yang sama tanpa pengamatan lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Mengubah seluruh faktor lapangan sekaligus, lalu membandingkan satu hasil akhir tanpa kondisi acuan.",
        },
        {
          isCorrect: false,
          label:
            "Mengambil satu kejadian nyata yang sesuai dengan model sebagai konfirmasi bahwa pola selalu berlaku.",
        },
        {
          isCorrect: false,
          label:
            "Mengganti pengukuran dengan survei tentang apakah peserta memahami definisi istilah pada model.",
        },
        {
          isCorrect: true,
          label:
            "Memantau perubahan populasi serta beberapa hubungan makan di kebun pada musim yang berbeda.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
