import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Simbol yang lebih kontras dipilih untuk mengatasi kesulitan peserta membedakan penanda.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras menghapus kebutuhan untuk mengukur keberhasilan peserta.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras memungkinkan tim mengubah banyak kondisi sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras menjelaskan mengapa semua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras dipilih hanya karena hasil akhirnya sudah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
