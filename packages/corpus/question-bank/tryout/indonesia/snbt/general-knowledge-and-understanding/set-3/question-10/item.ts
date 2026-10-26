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
          correct: true,
          label:
            "Perbedaan sumber tidak harus dihapus; museum perlu menjelaskan mana yang terbukti, diingat, dan masih terbuka.",
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
            "Museum dapat menetapkan waktu kegiatan secara pasti selama satu keterangan didukung oleh lebih banyak orang.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
