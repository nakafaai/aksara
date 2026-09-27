import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Penurunan keterlambatan ternyata terjadi karena perpustakaan menutup sebagian besar layanan peminjaman selama masa uji.",
        },
        {
          isCorrect: false,
          label:
            "Setelah nomor kontak diperbarui, penurunan keterlambatan juga terjadi pada kelompok yang sebelumnya tidak menerima pesan.",
        },
        {
          isCorrect: false,
          label:
            "Desain kartu baru membuat pengingat lebih mudah dibaca, tetapi tidak mengubah proporsi pengguna dengan nomor telepon yang masih aktif.",
        },
        {
          isCorrect: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
