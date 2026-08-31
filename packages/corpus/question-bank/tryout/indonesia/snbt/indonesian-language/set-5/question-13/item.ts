import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai 43 membuktikan bahwa label besar menghilangkan semua kesalahan pengiriman dan keterlambatan antarpulau.",
        },
        {
          isCorrect: false,
          label:
            "Selisih satu poin antara nilai dasar dan pembanding membuat hasil uji 43 tidak relevan bagi keputusan logistik.",
        },
        {
          isCorrect: false,
          label:
            "Masukan awak kapal dan sekolah penerima dapat menggantikan kebutuhan membandingkan hasil uji dengan kondisi pembanding.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 43 dibandingkan 32 mendukung penggunaan label besar secara terbatas untuk ketepatan tujuan, tetapi uji itu belum menunjukkan dampaknya terhadap keterlambatan akibat cuaca laut.",
        },
        {
          isCorrect: false,
          label:
            "Cuaca laut hanya memengaruhi waktu tiba, sehingga tidak perlu dipertimbangkan ketika label tujuan diterapkan pada rute lain.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
