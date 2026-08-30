import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap klinik kelurahan tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap klinik kelurahan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi literasi kesehatan tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Arum menghadapi hambatan dalam menemani nenek menjalani pemeriksaan kesehatan dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
