import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan.",
        },
        {
          isCorrect: false,
          label:
            "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
        {
          isCorrect: true,
          label:
            "Hasil pencarian nol tidak cukup untuk menyimpulkan ketiadaan sumber ketika proses pengenalan memiliki pola kegagalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
