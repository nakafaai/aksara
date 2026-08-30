import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kesiapan persenjataan",
        },
        {
          isCorrect: true,
          label: "Biaya dan dampak perang",
        },
        {
          isCorrect: false,
          label: "Perlindungan terhadap pemimpin",
        },
        {
          isCorrect: false,
          label: "Jumlah tentara yang tersedia",
        },
        {
          isCorrect: false,
          label: "Ketersediaan rumah sakit dan obat-obatan",
        },
      ],
    },
  },
};

export default item;
