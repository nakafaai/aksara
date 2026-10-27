import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan.",
        },
        {
          correct: false,
          label:
            "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip.",
        },
        {
          correct: true,
          label:
            "Otomatisasi memperluas akses, tetapi keluaran perlu disertai batas, bukti asli, dan mekanisme revisi.",
        },
        {
          correct: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
        {
          correct: false,
          label:
            "Otomatisasi bermanfaat karena dapat menggantikan gambar asli dengan keluaran yang tidak perlu diperiksa lagi.",
        },
      ],
    },
  },
};

export default item;
