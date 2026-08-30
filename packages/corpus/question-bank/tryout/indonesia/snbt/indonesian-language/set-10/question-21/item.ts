import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tari menghadapi hambatan dalam menjadi relawan pada hari pembukaan taman bermain dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap taman bermain inklusif tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap taman bermain inklusif.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi empati tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
