import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang peta penerangan jalan kampung",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam peta penerangan jalan kampung",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap perspektif di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang peta penerangan jalan kampung",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap peta penerangan jalan kampung",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
