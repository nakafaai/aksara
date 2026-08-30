import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap pengelolaan kostum teater tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap pengelolaan kostum teater.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi artefak tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Siswa membandingkan dua jenis sumber tentang pengelolaan kostum teater untuk menyusun penjelasan yang terbatas dan dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
