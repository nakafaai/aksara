import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap ruang laktasi di pasar tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap ruang laktasi di pasar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola ruang laktasi di pasar menilai penunjuk arah dari tiga pintu pasar melalui data pembanding dan masukan pihak terdampak.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi pemangku kepentingan tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
