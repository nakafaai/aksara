import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "coffee-picking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Panen kelompok tani itu kini berlangsung lebih cepat.",
        },
        {
          correct: false,
          label: "Kebun kelompok tani itu paling luas di kota.",
        },
        {
          correct: true,
          label:
            "Biji kopi dari kelompok tani itu kini matang merata sehingga rasanya lebih baik.",
        },
        {
          correct: false,
          label: "Petani dari desa tetangga ikut memetik kopi di kebun itu.",
        },
        {
          correct: false,
          label: "Kelompok tani itu kini memetik lebih banyak buah hijau.",
        },
      ],
    },
  },
};

export default item;
