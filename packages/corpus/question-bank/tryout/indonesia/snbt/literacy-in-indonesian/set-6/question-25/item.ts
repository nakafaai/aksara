import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dua Belas Jawaban sebagai Ukuran Tunggal Keberhasilan",
        },
        {
          correct: false,
          label: "Memberi Semua Langkah agar Dimas Tidak Pernah Salah",
        },
        {
          correct: false,
          label:
            "Penyangga Belajar sebagai Bantuan yang Tidak Pernah Dikurangi",
        },
        {
          correct: true,
          label: "Dari Contoh ke Pemeriksaan Mandiri",
        },
        {
          correct: false,
          label: "Kesalahan Pembagian yang Langsung Dibetulkan Sari",
        },
      ],
    },
  },
};

export default item;
