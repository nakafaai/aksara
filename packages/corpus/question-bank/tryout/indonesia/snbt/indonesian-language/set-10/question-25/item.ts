import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Langkah Kecil Tari di taman bermain inklusif",
        },
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
          label: "Sejarah Lengkap empati di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap taman bermain inklusif",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
