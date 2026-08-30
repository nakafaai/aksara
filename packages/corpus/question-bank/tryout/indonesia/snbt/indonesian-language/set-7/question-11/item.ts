import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengelola antrean pemeriksaan kesehatan menilai nomor tahap yang ditandai pada lantai melalui data pembanding dan masukan pihak terdampak.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap antrean pemeriksaan kesehatan tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap antrean pemeriksaan kesehatan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi alur layanan tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
