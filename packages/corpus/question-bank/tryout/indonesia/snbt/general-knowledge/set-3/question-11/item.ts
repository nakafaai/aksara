import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Sebuah foto bertanggal yang baru ditemukan secara jelas mencatat jam transaksi dan menyelesaikan perbedaan kedua sumber.",
        },
        {
          isCorrect: false,
          label:
            "Dua arsip independen tambahan juga memberikan keterangan yang saling berbeda tentang waktu kegiatan.",
        },
        {
          isCorrect: false,
          label: "Sebagian pengunjung lebih menyukai label yang lebih pendek.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
