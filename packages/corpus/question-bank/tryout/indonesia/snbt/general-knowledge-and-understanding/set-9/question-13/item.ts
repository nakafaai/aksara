import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "daftar peristiwa berurutan tanpa pembagian tahap analisis",
        },
        {
          correct: false,
          label: "pemilihan tanggal tertua sebagai awal untuk semua tujuan",
        },
        {
          correct: false,
          label:
            "penghapusan masa peralihan agar setiap tahap memiliki batas tegas",
        },
        {
          correct: false,
          label: "perkiraan tanggal yang sangat rinci tanpa dukungan sumber",
        },
        {
          correct: true,
          label:
            "pembagian waktu ke dalam tahap yang dipilih untuk menjelaskan perubahan tertentu",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
