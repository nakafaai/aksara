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
          isCorrect: true,
          label:
            "Otomatisasi memperluas akses, tetapi keluaran perlu disertai batas, bukti asli, dan mekanisme revisi.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
        {
          isCorrect: false,
          label:
            "Otomatisasi bermanfaat karena dapat menggantikan gambar asli dengan keluaran yang tidak perlu diperiksa lagi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
