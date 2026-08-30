import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang kotak perbandingan perpindahan panas",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam kotak perbandingan perpindahan panas",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Kotak perbandingan perpindahan panas",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap konduksi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap kotak perbandingan perpindahan panas",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
