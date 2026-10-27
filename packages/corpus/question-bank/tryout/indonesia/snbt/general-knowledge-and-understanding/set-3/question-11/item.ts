import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebuah foto bertanggal yang baru ditemukan secara jelas mencatat jam transaksi dan menyelesaikan perbedaan kedua sumber.",
        },
        {
          correct: false,
          label:
            "Dua arsip independen tambahan juga memberikan keterangan yang saling berbeda tentang waktu kegiatan.",
        },
        {
          correct: false,
          label: "Sebagian pengunjung lebih menyukai label yang lebih pendek.",
        },
        {
          correct: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          correct: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
      ],
    },
  },
};

export default item;
