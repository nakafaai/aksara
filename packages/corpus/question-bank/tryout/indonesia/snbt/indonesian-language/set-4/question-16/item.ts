import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap tur bangunan bersejarah tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap tur bangunan bersejarah.",
        },
        {
          isCorrect: true,
          label:
            "Siswa membandingkan dua jenis sumber tentang tur bangunan bersejarah untuk menyusun penjelasan yang terbatas dan dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi triangulasi tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
