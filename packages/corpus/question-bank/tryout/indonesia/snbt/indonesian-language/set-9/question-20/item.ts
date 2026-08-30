import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang pengelolaan kostum teater",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam pengelolaan kostum teater",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap artefak di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap pengelolaan kostum teater",
        },
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang pengelolaan kostum teater",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
