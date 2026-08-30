import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang taman bermain inklusif",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam taman bermain inklusif",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap desain inklusif di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap taman bermain inklusif",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam taman bermain inklusif",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
