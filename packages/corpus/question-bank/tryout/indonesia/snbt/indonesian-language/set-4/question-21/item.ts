import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap pasar kecamatan tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap pasar kecamatan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: true,
          label:
            "Nisa menghadapi hambatan dalam mengikuti latihan mandiri di pasar dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi advokasi diri tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
