import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dito telah menyelesaikan latihan prasyarat",
        },
        {
          correct: false,
          label: "Dito tidak mengikuti tes simulasi",
        },
        {
          correct: true,
          label: "Dito menerima laporan evaluasi",
        },
        {
          correct: false,
          label: "Dito tidak menerima laporan evaluasi",
        },
        {
          correct: false,
          label:
            "Dito telah menyelesaikan latihan prasyarat dan menerima laporan evaluasi",
        },
      ],
    },
  },
};

export default item;
