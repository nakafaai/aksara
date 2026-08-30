import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang peta kartu daur karbon",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Peta kartu daur karbon",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam peta kartu daur karbon",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap reservoir di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap peta kartu daur karbon",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
