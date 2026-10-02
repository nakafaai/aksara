import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih agar kesepakatan pencatat tidak perlu diukur lagi.",
        },
        {
          isCorrect: true,
          label:
            "Contoh foto dipilih untuk memperjelas kategori tertulis yang sebelumnya menghasilkan perbedaan penilaian.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih agar beberapa unsur pendataan dapat diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih hanya karena hasil akhir pengujian sudah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
