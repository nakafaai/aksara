import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang rangkaian listrik dengan dua lampu",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam rangkaian listrik dengan dua lampu",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap rangkaian tertutup di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap rangkaian listrik dengan dua lampu",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Rangkaian listrik dengan dua lampu",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
