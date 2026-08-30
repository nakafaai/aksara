import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa membandingkan dua jenis sumber tentang ruang penyimpanan karya seni untuk menyusun penjelasan yang terbatas dan dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap ruang penyimpanan karya seni tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap ruang penyimpanan karya seni.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi provenans tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
