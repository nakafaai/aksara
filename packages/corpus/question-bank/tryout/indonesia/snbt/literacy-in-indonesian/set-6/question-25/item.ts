import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dua Belas Jawaban sebagai Ukuran Tunggal Keberhasilan",
        },
        {
          isCorrect: false,
          label: "Memberi Semua Langkah agar Dimas Tidak Pernah Salah",
        },
        {
          isCorrect: false,
          label:
            "Penyangga Belajar sebagai Bantuan yang Tidak Pernah Dikurangi",
        },
        {
          isCorrect: true,
          label: "Dari Contoh ke Pemeriksaan Mandiri",
        },
        {
          isCorrect: false,
          label: "Kesalahan Pembagian yang Langsung Dibetulkan Sari",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
