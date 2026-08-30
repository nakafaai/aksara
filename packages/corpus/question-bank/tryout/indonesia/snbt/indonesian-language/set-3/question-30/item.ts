import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang terminal saat hujan sore",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam terminal saat hujan sore",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap simbol di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Lampu baca kecil di terminal saat hujan sore",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap terminal saat hujan sore",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
