import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang peredaman bunyi dalam kotak model",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam peredaman bunyi dalam kotak model",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap atenuasi di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label:
            "Menguji lapisan gabus setebal dua sentimeter dalam peredaman bunyi dalam kotak model",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap peredaman bunyi dalam kotak model",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
