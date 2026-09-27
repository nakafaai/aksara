import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "daftar peristiwa berurutan tanpa pembagian tahap analisis",
        },
        {
          isCorrect: false,
          label: "pemilihan tanggal tertua sebagai awal untuk semua tujuan",
        },
        {
          isCorrect: false,
          label:
            "penghapusan masa peralihan agar setiap tahap memiliki batas tegas",
        },
        {
          isCorrect: false,
          label: "perkiraan tanggal yang sangat rinci tanpa dukungan sumber",
        },
        {
          isCorrect: true,
          label:
            "pembagian waktu ke dalam tahap yang dipilih untuk menjelaskan perubahan tertentu",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
