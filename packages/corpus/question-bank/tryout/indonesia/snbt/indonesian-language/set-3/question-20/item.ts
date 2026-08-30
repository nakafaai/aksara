import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang panggung baca di terminal",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam panggung baca di terminal",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap sumber sezaman di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang panggung baca di terminal",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap panggung baca di terminal",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
