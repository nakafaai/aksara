import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "ulat",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Penurunan ulat di petak berperangkap dua kali penurunan ulat di petak tanpa perangkap.",
        },
        {
          column: 1,
          label: "Banyak ulat di petak tanpa perangkap turun $$40\\%$$.",
        },
        {
          column: 1,
          label:
            "Pada akhir bulan, ulat di petak tanpa perangkap $$50\\%$$ lebih banyak daripada ulat di petak berperangkap.",
        },
        {
          column: 2,
          label: "Teks membuktikan bahwa hujan menurunkan banyak ulat.",
        },
      ],
    },
  },
};

export default item;
