import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang ruang laktasi di pasar",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam ruang laktasi di pasar",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam ruang laktasi di pasar",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap pemangku kepentingan di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap ruang laktasi di pasar",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
