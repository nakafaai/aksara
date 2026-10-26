import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          correct: true,
          label:
            "Museum meningkatkan keandalan keterangan dengan membedakan dokumen, ingatan, dan ketidakpastian, bukan dengan memaksa satu versi menang.",
        },
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
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
