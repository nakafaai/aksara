import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan hanya mencatat sejarah lengkap program teman belajar tanpa membahas keputusan atau bukti.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa satu cara pasti berhasil dalam setiap program teman belajar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menolak seluruh pengukuran dan hanya mengandalkan kesan pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan terutama menjelaskan definisi dukungan sebaya tanpa menghubungkannya dengan konteks.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola program teman belajar menilai kartu tujuan untuk setiap pertemuan melalui data pembanding dan masukan pihak terdampak.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
