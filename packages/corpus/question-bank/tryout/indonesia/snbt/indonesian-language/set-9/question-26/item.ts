import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pilihan kecil Wulan mengubah makna label kain dalam menghadapi konflik di gudang kostum teater.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap gudang kostum teater tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap gudang kostum teater.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi motif tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
