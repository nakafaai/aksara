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
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          isCorrect: true,
          label:
            "Sanksi bertahap dan pengingat berpotensi lebih adil, tetapi jalur komunikasi dan pengecualian masih perlu diuji.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
