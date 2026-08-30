import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap ruang arsip sekolah tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap ruang arsip sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi metakognisi tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Raka menghadapi hambatan dalam menyelesaikan proyek dokumentasi kampung dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
