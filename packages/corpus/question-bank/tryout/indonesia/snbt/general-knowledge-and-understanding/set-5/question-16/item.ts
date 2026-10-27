import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penurunan keterlambatan ternyata terjadi karena perpustakaan menutup sebagian besar layanan peminjaman selama masa uji.",
        },
        {
          correct: false,
          label:
            "Setelah nomor kontak diperbarui, penurunan keterlambatan juga terjadi pada kelompok yang sebelumnya tidak menerima pesan.",
        },
        {
          correct: false,
          label:
            "Desain kartu baru membuat pengingat lebih mudah dibaca, tetapi tidak mengubah proporsi pengguna dengan nomor telepon yang masih aktif.",
        },
        {
          correct: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          correct: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
      ],
    },
  },
};

export default item;
