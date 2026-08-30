import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap kolom infiltrasi dari tiga jenis tanah tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap kolom infiltrasi dari tiga jenis tanah.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi infiltrasi tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Kolom infiltrasi dari tiga jenis tanah menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
