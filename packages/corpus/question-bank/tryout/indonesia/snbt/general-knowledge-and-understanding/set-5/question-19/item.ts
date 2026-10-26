import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
        {
          correct: true,
          label:
            "Kebijakan yang proporsional menyesuaikan konsekuensi dengan lamanya keterlambatan dan dampaknya.",
        },
        {
          correct: false,
          label:
            "Keberhasilan kebijakan terutama ditentukan oleh banyaknya uang denda yang berhasil dikumpulkan.",
        },
        {
          correct: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
        {
          correct: false,
          label:
            "Keterlambatan singkat dan panjang harus selalu dikenai konsekuensi yang sama agar aturan dianggap adil.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
