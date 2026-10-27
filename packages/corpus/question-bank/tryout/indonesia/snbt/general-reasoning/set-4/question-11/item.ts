import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dito menyelesaikan latihan prasyarat",
        },
        {
          correct: false,
          label: "Dito mengikuti tes latihan",
        },
        {
          correct: false,
          label: "Dito bukan seorang siswa",
        },
        {
          correct: true,
          label: "Dito tidak menyelesaikan latihan prasyarat",
        },
        {
          correct: false,
          label: "Dito menerima laporan evaluasi",
        },
      ],
    },
  },
};

export default item;
