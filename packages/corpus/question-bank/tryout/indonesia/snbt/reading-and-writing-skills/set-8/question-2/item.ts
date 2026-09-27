import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menggunakan hasil lama tanpa mengumpulkan data baru",
        },
        {
          isCorrect: true,
          label:
            "mempertahankan ketentuan ukuran kelompok agar kondisi peserta tetap sebanding",
        },
        {
          isCorrect: false,
          label:
            "mengubah jumlah peserta setiap kali hasil tidak sesuai harapan",
        },
        {
          isCorrect: false,
          label: "menyamakan semua hasil sebelum menghitung rata-rata",
        },
        {
          isCorrect: false,
          label: "mewajibkan seluruh peserta memberikan pertanyaan yang sama",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
