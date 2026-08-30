import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang klinik kelurahan",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam klinik kelurahan",
        },
        {
          isCorrect: true,
          label: "Langkah Kecil Arum di klinik kelurahan",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap literasi kesehatan di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap klinik kelurahan",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
