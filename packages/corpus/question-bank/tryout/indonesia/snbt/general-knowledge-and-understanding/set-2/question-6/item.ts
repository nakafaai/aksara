import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "antibiotik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Resistansi tumbuh lewat seleksi yang terjadi pada setiap pemakaian antibiotik, termasuk yang sesuai resep, lalu sifat tahannya dapat diwariskan dan berpindah.",
        },
        {
          correct: false,
          label:
            "Resistansi antibiotik terutama muncul karena di banyak tempat antibiotik masih dibeli dan dipakai tanpa resep dokter.",
        },
        {
          correct: false,
          label:
            "Antibiotik mengubah bakteri yang semula dapat dihambat menjadi kebal, lalu sifat kebal itu diwariskan dan berpindah ke bakteri lain.",
        },
        {
          correct: false,
          label:
            "Sifat kebal terhadap antibiotik melekat pada bakteri, bukan pada tubuh orang yang meminum obat itu.",
        },
        {
          correct: false,
          label:
            "Bakteri usus menjadi sumber utama resistansi karena obat yang diminum juga mengenai bakteri di sana.",
        },
      ],
    },
  },
};

export default item;
