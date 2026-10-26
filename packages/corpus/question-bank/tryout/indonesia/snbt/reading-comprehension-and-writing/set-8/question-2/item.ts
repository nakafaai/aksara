import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menggunakan hasil lama tanpa mengumpulkan data baru",
        },
        {
          correct: true,
          label:
            "mempertahankan ketentuan ukuran kelompok agar kondisi peserta tetap sebanding",
        },
        {
          correct: false,
          label:
            "mengubah jumlah peserta setiap kali hasil tidak sesuai harapan",
        },
        {
          correct: false,
          label: "menyamakan semua hasil sebelum menghitung rata-rata",
        },
        {
          correct: false,
          label: "mewajibkan seluruh peserta memberikan pertanyaan yang sama",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
