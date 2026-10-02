import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
        {
          isCorrect: true,
          label:
            "Kebijakan yang proporsional menyesuaikan konsekuensi dengan lamanya keterlambatan dan dampaknya.",
        },
        {
          isCorrect: false,
          label:
            "Keberhasilan kebijakan terutama ditentukan oleh banyaknya uang denda yang berhasil dikumpulkan.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
        {
          isCorrect: false,
          label:
            "Keterlambatan singkat dan panjang harus selalu dikenai konsekuensi yang sama agar aturan dianggap adil.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
