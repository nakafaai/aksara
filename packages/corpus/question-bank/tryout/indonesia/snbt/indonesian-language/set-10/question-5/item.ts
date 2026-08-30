import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menguji reflektor pada sudut 45 derajat dalam pemanasan air dengan oven surya model",
        },
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang pemanasan air dengan oven surya model",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam pemanasan air dengan oven surya model",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap reflektor di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap pemanasan air dengan oven surya model",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
