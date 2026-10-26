import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Catatan Awal Sebelum Pengujian Label Rak",
        },
        {
          correct: true,
          label: "Pengujian Label Foto pada Rak Pengembalian Alat Olahraga",
        },
        {
          correct: false,
          label:
            "Pengujian Beberapa Perubahan Serentak pada Layanan Peminjaman",
        },
        {
          correct: false,
          label:
            "Tanggapan Peminjam terhadap Perancangan Ulang Permanen Layanan",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Layanan Peminjaman Alat Olahraga",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
