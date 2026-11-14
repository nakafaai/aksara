import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "tongkol",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada kedua musim, TPI desa itu tidak menerima tongkol dari nelayan desa lain.",
        },
        {
          correct: false,
          label:
            "Tongkol yang ditangkap di sekitar rumpon rata-rata lebih kecil daripada tongkol dari perairan dekat pantai, dan tongkol kecil dihargai lebih murah.",
        },
        {
          correct: false,
          label:
            "Seluruh tongkol yang dijual kelompok itu di TPI desa naik dari $$320$$ ton pada musim 2024 menjadi $$376$$ ton pada musim 2025.",
        },
        {
          correct: false,
          label:
            "Banyak pembeli yang datang ke TPI desa itu pada musim 2025 sama dengan pada musim 2024.",
        },
        {
          correct: true,
          label:
            "Pada musim 2025, harga tongkol juga turun sekitar seperempat di TPI desa-desa pesisir lain yang nelayannya tidak memakai rumpon dan tidak menerima tongkol dari kelompok itu.",
        },
      ],
    },
  },
};

export default item;
