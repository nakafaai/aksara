import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan sumber tidak harus dihapus; museum perlu menjelaskan mana yang terbukti, diingat, dan masih terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita.",
        },
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          isCorrect: false,
          label:
            "Museum dapat menetapkan waktu kegiatan secara pasti selama satu keterangan didukung oleh lebih banyak orang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
