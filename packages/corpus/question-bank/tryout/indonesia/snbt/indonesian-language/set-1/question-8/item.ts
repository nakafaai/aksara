import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Seluruh pantai di Indonesia akan bebas sampah",
        },
        {
          isCorrect: false,
          label: "Tidak akan ada lagi sampah dari kapal dan perikanan",
        },
        {
          isCorrect: false,
          label: "Semua bentuk polusi laut di Seychelles akan hilang",
        },
        {
          isCorrect: true,
          label:
            "Indonesia diperkirakan menjadi sumber tunggal terbesar sampah berbasis daratan di banyak lokasi Seychelles",
        },
        {
          isCorrect: false,
          label: "Seychelles tidak lagi mengalami musim penumpukan sampah",
        },
      ],
    },
  },
};

export default item;
