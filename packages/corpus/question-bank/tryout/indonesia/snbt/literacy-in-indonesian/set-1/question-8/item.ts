import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Seluruh pantai di Indonesia akan bebas sampah",
        },
        {
          correct: false,
          label: "Tidak akan ada lagi sampah dari kapal dan perikanan",
        },
        {
          correct: false,
          label: "Semua bentuk polusi laut di Seychelles akan hilang",
        },
        {
          correct: false,
          label: "Seychelles tidak lagi mengalami musim penumpukan sampah",
        },
        {
          correct: true,
          label:
            "Indonesia diperkirakan menjadi sumber tunggal terbesar sampah berbasis daratan di banyak lokasi Seychelles",
        },
      ],
    },
  },
};

export default item;
