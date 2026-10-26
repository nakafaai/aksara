import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
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
          correct: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          correct: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          correct: true,
          label:
            "Keterbukaan terhadap perbedaan sumber dapat membuat arsip lebih dapat dipercaya selama status setiap klaim dijelaskan.",
        },
      ],
    },
  },
};

export default item;
