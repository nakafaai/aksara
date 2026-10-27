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
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
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
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          correct: true,
          label:
            "Sanksi bertahap dan pengingat berpotensi lebih adil, tetapi jalur komunikasi dan pengecualian masih perlu diuji.",
        },
      ],
    },
  },
};

export default item;
