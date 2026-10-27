import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kesiapan persenjataan",
        },
        {
          correct: false,
          label: "Perlindungan terhadap pemimpin",
        },
        {
          correct: false,
          label: "Jumlah tentara yang tersedia",
        },
        {
          correct: false,
          label: "Ketersediaan rumah sakit dan obat-obatan",
        },
        {
          correct: true,
          label: "Biaya dan dampak perang",
        },
      ],
    },
  },
};

export default item;
