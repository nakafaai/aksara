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
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Keterbukaan terhadap perbedaan sumber dapat membuat arsip lebih dapat dipercaya selama status setiap klaim dijelaskan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
