import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
        {
          correct: false,
          label:
            "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita.",
        },
        {
          correct: true,
          label:
            "Kejujuran tentang bagian yang belum pasti merupakan bagian dari ketelitian arsip, bukan tanda bahwa penelitian gagal.",
        },
        {
          correct: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          correct: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
