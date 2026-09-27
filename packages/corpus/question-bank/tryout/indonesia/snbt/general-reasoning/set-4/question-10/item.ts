import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dito telah menyelesaikan latihan prasyarat",
        },
        {
          isCorrect: false,
          label: "Dito tidak mengikuti tes simulasi",
        },
        {
          isCorrect: true,
          label: "Dito menerima laporan evaluasi",
        },
        {
          isCorrect: false,
          label: "Dito tidak menerima laporan evaluasi",
        },
        {
          isCorrect: false,
          label:
            "Dito telah menyelesaikan latihan prasyarat dan menerima laporan evaluasi",
        },
      ],
    },
  },
};

export default item;
