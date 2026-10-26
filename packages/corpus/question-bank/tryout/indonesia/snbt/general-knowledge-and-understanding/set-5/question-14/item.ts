import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pola keterlambatan menjadi dasar dua usulan, lalu hasil uji dan masalah komunikasi membentuk rancangan lanjutan.",
        },
        {
          correct: false,
          label:
            "Bagian awal menunjukkan semua keterlambatan berdampak sama, lalu bagian berikutnya menerapkan pembatasan yang sama kepada semua pengguna.",
        },
        {
          correct: false,
          label:
            "Bagian awal membandingkan pendapatan denda, lalu bagian berikutnya memilih usulan dengan penerimaan uang terbesar.",
        },
        {
          correct: false,
          label:
            "Bagian awal menguji dua saluran pengingat, lalu bagian berikutnya menghentikan uji karena semua pengguna sudah menerima pesan.",
        },
        {
          correct: false,
          label:
            "Bagian awal menetapkan aturan baru sebagai keputusan final, lalu bagian berikutnya hanya menjelaskan cara membayar denda.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
