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
            "Besarnya pendapatan denda tidak selalu menunjukkan bahwa layanan perpustakaan bekerja lebih baik.",
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
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
