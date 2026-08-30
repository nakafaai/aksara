import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang model jaring-jaring makanan di kebun sekolah",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam model jaring-jaring makanan di kebun sekolah",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap jaring-jaring makanan di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label:
            "Kegunaan dan Batas Model jaring-jaring makanan di kebun sekolah",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap model jaring-jaring makanan di kebun sekolah",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
