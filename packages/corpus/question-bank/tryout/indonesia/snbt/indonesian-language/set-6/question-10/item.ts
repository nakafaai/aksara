import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang model erosi menggunakan baki tanah",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam model erosi menggunakan baki tanah",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap erosi di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Model erosi menggunakan baki tanah",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap model erosi menggunakan baki tanah",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
