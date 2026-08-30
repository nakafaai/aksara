import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang pameran sains keliling",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam pameran sains keliling",
        },
        {
          isCorrect: true,
          label: "Kartu pertanyaan di pameran sains keliling",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap atmosfer di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap pameran sains keliling",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
