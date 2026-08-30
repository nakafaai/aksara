import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap ruang penyimpanan karya seni pada malam hari tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap ruang penyimpanan karya seni pada malam hari.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi sudut pandang terbatas tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Pilihan kecil Reno mengubah makna kartu kondisi dalam menghadapi konflik di ruang penyimpanan karya seni pada malam hari.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
