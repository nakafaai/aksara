import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pola keterlambatan menjadi dasar dua usulan, lalu hasil uji dan masalah komunikasi membentuk rancangan lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menunjukkan semua keterlambatan berdampak sama, lalu bagian berikutnya menerapkan pembatasan yang sama kepada semua pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan pendapatan denda, lalu bagian berikutnya memilih usulan dengan penerimaan uang terbesar.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menguji dua saluran pengingat, lalu bagian berikutnya menghentikan uji karena semua pengguna sudah menerima pesan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan aturan baru sebagai keputusan final, lalu bagian berikutnya hanya menjelaskan cara membayar denda.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
