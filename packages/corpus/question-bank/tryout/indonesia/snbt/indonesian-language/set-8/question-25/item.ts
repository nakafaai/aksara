import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang balai warga",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam balai warga",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap integritas ilmiah di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Langkah Kecil Dito di balai warga",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap balai warga",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
