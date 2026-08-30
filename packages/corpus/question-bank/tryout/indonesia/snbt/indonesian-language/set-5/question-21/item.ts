import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap gudang kecil dekat pelabuhan tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: true,
          label:
            "Bima menghadapi hambatan dalam mengirim kotak buku tepat sebelum kapal berangkat dan belajar melalui tindakan kecil yang bertanggung jawab.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap gudang kecil dekat pelabuhan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi akuntabilitas tanpa menghubungkannya dengan konteks.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
