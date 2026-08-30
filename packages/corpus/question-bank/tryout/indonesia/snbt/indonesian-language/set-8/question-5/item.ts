import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang kehilangan massa pada daun",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam kehilangan massa pada daun",
        },
        {
          isCorrect: true,
          label:
            "Menguji lapisan tipis petroleum jelly pada permukaan bawah daun dalam kehilangan massa pada daun",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap transpirasi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap kehilangan massa pada daun",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
