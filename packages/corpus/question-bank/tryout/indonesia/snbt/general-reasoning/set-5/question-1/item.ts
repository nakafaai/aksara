import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "tongkol",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rumpon menaikkan penghasilan bersih semusim setiap perahu besar sekitar $$60\\%$$.",
        },
        {
          correct: false,
          label:
            "Harga tongkol di TPI desa turun karena perahu besar membawa pulang lebih banyak tongkol dari rumpon.",
        },
        {
          correct: false,
          label:
            "Karena perahu besar lebih jarang melaut, seluruh tangkapan tongkol kelompok itu pada musim 2025 lebih sedikit daripada pada musim 2024.",
        },
        {
          correct: false,
          label:
            "Penghasilan bersih semusim setiap perahu kecil turun $$25\\%$$, sama dengan penurunan harga tongkol.",
        },
        {
          correct: true,
          label:
            "Pada musim 2025, setiap perahu besar membawa pulang lebih banyak tongkol dalam semusim, tetapi penghasilan bersihnya lebih rendah daripada pada musim 2024.",
        },
      ],
    },
  },
};

export default item;
