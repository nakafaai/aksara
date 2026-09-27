import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dito menyelesaikan latihan prasyarat",
        },
        {
          isCorrect: false,
          label: "Dito mengikuti tes latihan",
        },
        {
          isCorrect: false,
          label: "Dito bukan seorang siswa",
        },
        {
          isCorrect: true,
          label: "Dito tidak menyelesaikan latihan prasyarat",
        },
        {
          isCorrect: false,
          label: "Dito menerima laporan evaluasi",
        },
      ],
    },
  },
};

export default item;
