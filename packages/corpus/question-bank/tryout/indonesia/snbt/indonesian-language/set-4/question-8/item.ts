import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mengulang model daur air dalam kotak dengan lebih banyak unit, tetapi tetap memakai penyederhanaan yang sama tanpa pengamatan lapangan.",
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
            "Mencatat suhu, kelembapan, penguapan, dan kondensasi pada beberapa kondisi cuaca nyata.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
